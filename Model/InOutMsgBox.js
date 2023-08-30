require('dotenv').config();
const mongoose = require('mongoose');
const  db = require('./Db');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required : true
    },
    status: {
        type: String,
        required: true,
      }
  });
  
  const InOutMsgBox = mongoose.model('InOutMsgBox', userSchema);

  module.exports = InOutMsgBox;