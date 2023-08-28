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
    username : {
        type: String,
        required: true,
    },
    image : {
        type: String,
        required: true,
    },
    alert : {
        type : String,
        require : true
    }
  });
  
  const Notifications = mongoose.model('Notifications', userSchema);

  module.exports = Notifications;