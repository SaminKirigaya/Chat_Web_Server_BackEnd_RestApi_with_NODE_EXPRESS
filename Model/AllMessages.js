require('dotenv').config();
const mongoose = require('mongoose');
const  db = require('./Db');


const userSchema = new mongoose.Schema({
    senderId: {
      type: String,
      required: true,
    
    },
    recverId: {
      type: String,
      required: true,
    },
    sendingtime :{
        type : Date,
        required : true
    },
    senderAvatar : {
        type : String,
        required : true
    },
    username: {
        type : String,
        required : true
    },
    message : {
        type : String,
       
    },
    image : {
        type : String,
        
    }
  });
  
  const AllMessages = mongoose.model('AllMessages', userSchema);

  module.exports = AllMessages;