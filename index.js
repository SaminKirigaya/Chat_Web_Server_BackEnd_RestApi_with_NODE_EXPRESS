require('dotenv').config();
const express = require('express');
const app = express();
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
    return  res.status(500).json({ error: 'Something went wrong!' });
    
});


console.log('Connected To Database ...');
app.listen(process.env.PORT, ()=>{
    console.log(`SERVER RUNNING ... ${process.env.PORT}`);
})  


