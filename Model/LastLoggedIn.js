require('dotenv').config();
const mongoose = require('mongoose');
const  db = require('./Db');

const userSchema = new mongoose.Schema({
    lastonline: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        required: true,
      }
  });
  
  const LastLoggedIn = mongoose.model('LastLoggedIn', userSchema);

  module.exports = LastLoggedIn;