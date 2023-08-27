require('dotenv').config();
const http = require('http');
const {AuthenLiveServer} = require('./Middleware/AuthenLiveServer');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors()); 
const server = http.createServer(app);
const socketIo = require('socket.io');
const io = socketIo(server,{
    cors: {
        origin: '*',
      }
});


const morgan = require('morgan');
const mongoose = require('mongoose');
const db = require('./Model/Db');
const { date } = require('joi');


app.use(morgan('tiny'));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Replace with your frontend domain
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Replace with your custom headers, if any
    res.header('Access-Control-Allow-Methods', 'GET, POST'); // Allow only the GET, POST method
    next();
  });


app.use(express.json());


app.use('/public/images', express.static(__dirname + '/public/images'));

var userSocketMap = {};



io.on('connection',(socket)=>{
    console.log('A user connected ...');

    socket.on('authenticate', (userId) => {
        userSocketMap[userId] = socket.id;
        console.log(`User ${userId} authenticated`);
      });

      
    socket.on('privateMessage', (data)=>{

        const toSocketId = userSocketMap[data.toUserId];
        if (toSocketId) {

        const whosentsl = data.fromUserId;
        const sendertk = data.myToken;
        console.log(whosentsl, sendertk)
        const result = AuthenLiveServer(whosentsl, sendertk);
        console.log(result)

        io.to(toSocketId).emit('privateMessage', [{
            message: data.message,
            image: data.image,
            username : data.username,
            sendingtime : data.sendingtime,
            
          }]); // make a logic if message == '' send data.iamge also save all message or image


        } else {
        console.log(`User ${data.toUserId} is not connected.`);// set notification and save message in database but not io.to
        }

    });


    socket.on('disconnect', () => {
         // Remove the user from the mapping when they disconnect
        const userIdToRemove = Object.keys(userSocketMap).find(
        (key) => userSocketMap[key] === socket.id
      );
      if (userIdToRemove) {
        delete userSocketMap[userIdToRemove];
        console.log(`User ${userIdToRemove} disconnected`);
      }

      });



    });






function routeHandle (req, res, next){
    try{
        let Routes = require('./Rout/Routes');
        app.use(Routes);

        next();

    }catch(err){
        console.log(err);
        next(err);
    }
}

app.use(routeHandle);


app.use((err, req, res, next) => {
    console.error('Global Error Handler:', err);
    res.status(500).json({ error: 'Something went wrong!' });
    next(err)
    
});


console.log('Connected To Database ...');
server.listen(process.env.PORT, ()=>{
    console.log(`SERVER RUNNING ... ${process.env.PORT}`);
})  


