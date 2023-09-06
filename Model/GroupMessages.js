require('dotenv').config();
const mongoose = require('mongoose');
const  db = require('./Db');


const userSchema = new mongoose.Schema({
    senderId: {
      type: String,
      required: true,
    
    },
    sendingtime :{
        type : Date,
        default : Date.now
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
        
    },
    groupname: {
        type : String,
        required : true
    }
  });
  
  const GroupMessages = mongoose.model('GroupMessages', userSchema);

  module.exports = GroupMessages;