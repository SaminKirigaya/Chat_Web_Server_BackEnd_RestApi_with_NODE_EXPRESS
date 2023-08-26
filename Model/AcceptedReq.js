require('dotenv').config();
const db = require('./Db');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    senderID: {
      type: String,
      required: true,
    },
    recverID: {
        type: String,
        required: true,
      },
    sendingTime:{
        type : Date,
        default : Date.now
    }  
  });
  
  const AcceptedReq = mongoose.model('AcceptedReq', userSchema);

  module.exports = AcceptedReq;