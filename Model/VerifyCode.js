require('dotenv').config();
const mongoose = require('mongoose');
const  db = require('./Db');

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    otp: {
      type: String,
      required: true,
    }
  });
  
  const VerifyCode = mongoose.model('VerifyCode', userSchema);

  module.exports = VerifyCode;