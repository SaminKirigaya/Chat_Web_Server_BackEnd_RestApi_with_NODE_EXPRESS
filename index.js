require('dotenv').config();
const http = require('http');
const fs = require('fs');


const {AuthenLiveServer} = require('./Middleware/AuthenLiveServer');
const {CheckFriendLive} = require('./Middleware/CheckFriendLive');
const {LiveSenderData} = require('./Middleware/LiveSenderData');
const {ImgNameGener} = require('./Middleware/ImgNameGener');
const {SaveMessages} = require('./Middleware/SaveMessages');
const {SendNotification} = require('./Middleware/SendNotification');
const {SendNotiIfChatOther} = require('./Middleware/SendNotiIfChatOther');
const {getCondition} = require('./Middleware/getCondition');
const {getMyAmount} = require('./Middleware/getMyAmount');
const {dragthreeMSG} = require('./Middleware/dragthreeMSG');
const {checkwhereUser} = require('./Middleware/checkwhereUser');
const {sendNotfAlways} = require('./Middleware/sendNotfAlways');
const {CheckIfMember} = require ('./Middleware/CheckIfMember');
const {SaveGroupMessages} = require('./Middleware/SaveGroupMessages');


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




//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------



io.on('connection',(socket)=>{
    console.log('A user connected ...');
 
    socket.on('authenticate', (userId) => {
        
        userSocketMap[userId] = socket.id;
        console.log(`User ${userId} authenticated`);
      });


      // testing 1 genuine .................
      
    socket.on('privateMessage', async(data)=>{

        const toSocketId = userSocketMap[data.toUserId];

        //--------------------------------------------------------------------------------------------------
        //--------------------------------------------------------------------------------------------------

        if (toSocketId) { //if reciever is online

        const whosentsl = data.fromUserId;
        const sendertk = data.myToken;
       
        const result = await AuthenLiveServer(whosentsl, sendertk); // if senders token usersl same
    

        if(result){// now checking if sender and receiver are friend added with theit serial in database
            
            const isfriend = await CheckFriendLive(data.fromUserId, data.toUserId); // checking if sender and receiver id are friend

            if(isfriend){ // aight they are friend

                // now figure out all data of sender 
                var UserData = await LiveSenderData(data.fromUserId); // it drags sender username and image out
                var receiverData = await LiveSenderData(data.toUserId); // save receiver username and image for later use at mongo

                io.to(toSocketId).emit('privateMessage', [{ // sending msg cause receiver is online
                    message: data.message,
                    image: data.image,
                    sendingtime : data.sendingtime,
                    username : UserData.username,
                    senderAvatar : UserData.image,
                    sentBy : data.fromUserId
                  }]); // make a logic if message == '' send data.image also save all message or image


                  if(data.image){
                    
                    const uniqueFilename = await ImgNameGener(20); // Implement a function to generate a unique filename
                    const imagePath = `public/images/${uniqueFilename}.jpg`; // Adjust the file extension as needed
                    const serverPath = `http://localhost:8000/public/images/${uniqueFilename}.jpg` 
                    fs.writeFile(imagePath, Buffer.from(data.image), (err) => {
                        if (err) {
                          console.error('Error writing image:', err);
                          // Handle the error
                        } else {
                          console.log('Image saved successfully.');
                          // Perform any additional actions
                        }});

                    const saved = await SaveMessages(data.fromUserId, data.toUserId, data.message, serverPath, UserData.username, UserData.image, data.sendingtime);
                  }else{
                    const serverPath = null
                    const saved = await SaveMessages(data.fromUserId, data.toUserId, data.message, serverPath, UserData.username, UserData.image, data.sendingtime);
                  }
                  


                  // notification set if he chatting other but someone different id sent a message : 
                  // inside message box mean chatting someone already outside mean afk or working something about profile still need to see notification
                  const insidemgbox = await checkwhereUser(data.toUserId);

                  if(!insidemgbox){// receiver outside msgbox

                    const sendNotif = await sendNotfAlways(data.fromUserId, data.toUserId, UserData.username, UserData.image);
                  //const chattingother = ? if true
                  var amount = await getMyAmount(data.toUserId);
                  
                  io.to(toSocketId).emit('notification', amount); 

                   // send back sender whom he messaged he needs last 3 user data in navbar


                   const senderSocketId = userSocketMap[data.fromUserId];
                   var threeSenderMsg = await dragthreeMSG(data.fromUserId);
 
                   io.to(senderSocketId).emit('navThreeLastUsers', threeSenderMsg); 
                   
                   


                  }else{// receiver inside msgbox
                    const sendNotif = await SendNotiIfChatOther(data.fromUserId, data.toUserId, UserData.username, UserData.image);
                  //const chattingother = ? if true

                  var chattingOther = await getCondition(data.fromUserId, data.toUserId);
                  if(chattingOther){
                  var amount = await getMyAmount(data.toUserId);
                  
                  io.to(toSocketId).emit('notification', amount); 
                  }
                  

                  // send back sender whom he messaged he needs last 3 user data in navbar


                  const senderSocketId = userSocketMap[data.fromUserId];
                  var threeSenderMsg = await dragthreeMSG(data.fromUserId);

                  io.to(senderSocketId).emit('navThreeLastUsers', threeSenderMsg); 
                  
                  
                  }
                  


            }
            
        }
        

        //------------------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------------------


        } else { // if receiver offline so cant emit it now just save in database



            const whosentsl = data.fromUserId;
            const sendertk = data.myToken;
           
            const result = await AuthenLiveServer(whosentsl, sendertk); // if senders token usersl same
        
    
            if(result){// now checking if sender and receiver are friend added with theit serial in database
                
                const isfriend = await CheckFriendLive(data.fromUserId, data.toUserId); // checking if sender and receiver id are friend
    
                if(isfriend){ // aight they are friend
    
                    // now figure out all data of sender 
                    var UserData = await LiveSenderData(data.fromUserId); // it drags sender username and image out
                    var receiverData = await LiveSenderData(data.toUserId); // save receiver username and image for later use at mongo
    
    
                    if(data.image){
                      
                        const uniqueFilename = await ImgNameGener(20); // Implement a function to generate a unique filename
                        const imagePath = `public/images/${uniqueFilename}.jpg`; // Adjust the file extension as needed
                        const serverPath = `http://localhost:8000/public/images/${uniqueFilename}.jpg` 
                        fs.writeFile(imagePath, Buffer.from(data.image), (err) => {
                            if (err) {
                              console.error('Error writing image:', err);
                              // Handle the error
                            } else {
                              console.log('Image saved successfully.');
                              // Perform any additional actions
                            }});
    
                        const saved = await SaveMessages(data.fromUserId, data.toUserId, data.message, serverPath, UserData.username, UserData.image, data.sendingtime);
                      }else{
                        const serverPath = null
                        const saved = await SaveMessages(data.fromUserId, data.toUserId, data.message, serverPath, UserData.username, UserData.image, data.sendingtime);
                      }
                      
    
                      // send notification
                      const sendNotif = await SendNotification(data.fromUserId, data.toUserId, UserData.username, UserData.image);

                }
                
            }

        console.log(`User ${data.toUserId} is not connected.`);// set notification and save message in database but not io.to
     
        }

    }
    
    );



    // -----------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------------
    // Group Message Function 

    

    socket.on('GroupMessage', async(data)=>{

      var UserData = await LiveSenderData(data.fromUserId);

      // If from user id a member send the message there
      var IsMember  = await CheckIfMember(data.fromUserId, data.toUserId);

      if(IsMember){

        io.emit(`${data.toUserId}`, [{ // sending msg cause receiver is online
          message: data.message,
          image: data.image,
          sendingtime : data.sendingtime,
          username : UserData.username,
          senderAvatar : UserData.image,
          sentBy : data.fromUserId
        }]);


        //save data
        if(data.image){
          
          const uniqueFilename = await ImgNameGener(20); // Implement a function to generate a unique filename
          const imagePath = `public/images/${uniqueFilename}.jpg`; // Adjust the file extension as needed
          const serverPath = `http://localhost:8000/public/images/${uniqueFilename}.jpg` 
          fs.writeFile(imagePath, Buffer.from(data.image), (err) => {
              if (err) {
                console.error('Error writing image:', err);
                // Handle the error
              } else {
                console.log('Image saved successfully.');
                // Perform any additional actions
              }});

          const saved = await SaveGroupMessages(data.fromUserId, data.toUserId, data.message, serverPath, UserData.username, UserData.image, data.sendingtime);
        }else{
          const serverPath = null
          const saved = await SaveGroupMessages(data.fromUserId, data.toUserId, data.message, serverPath, UserData.username, UserData.image, data.sendingtime);
        }



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



//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------



function routeHandle (req, res, next){
    try{
        let Routes = require('./Rout/Routes');
        app.use(Routes);

        next();

    }catch(err){
        console.log(err);
        throw err;
        
    }
}

app.use(routeHandle);


app.use((err, req, res, next) => {
    console.error('Global Error Handler:', err);
    res.status(500).json({ error: 'Something went wrong!' });
    next()
    
});


console.log('Connected To Database ...');
server.listen(process.env.PORT, ()=>{
    console.log(`SERVER RUNNING ... ${process.env.PORT}`);
})  


