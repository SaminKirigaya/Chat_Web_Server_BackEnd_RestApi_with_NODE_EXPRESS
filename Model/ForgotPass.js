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
    pass: {
      type: String,
      required: true,
    }
  });
  
  const ForgotPass = mongoose.model('ForgotPass', userSchema);

  module.exports = ForgotPass;