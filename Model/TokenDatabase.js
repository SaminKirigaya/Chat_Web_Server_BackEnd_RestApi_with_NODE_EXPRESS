require('dotenv').config();
const mongoose = require('mongoose');
const  db = require('./Db');

const userSchema = new mongoose.Schema({
    token: {
      type: String,
      required: true,
    },
    username: {
        type: String,
        required: true,
      }
  });
  
  const TokenDatabase = mongoose.model('TokenDatabase', userSchema);

  module.exports = TokenDatabase;