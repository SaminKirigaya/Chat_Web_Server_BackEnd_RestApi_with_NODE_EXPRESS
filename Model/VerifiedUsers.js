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
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    joinedDate: {
      type: Date,
      default: Date.now,
    },
  });


  userSchema.index({
    username: 'text',
    fullname: 'text',
    email: 'text'
  });
  
  const VerifiedUsers = mongoose.model('VerifiedUsers', userSchema);

  module.exports = VerifiedUsers;