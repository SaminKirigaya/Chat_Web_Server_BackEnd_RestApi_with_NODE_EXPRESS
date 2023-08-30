require('dotenv').config();
const mongoose = require('mongoose');
const  db = require('./Db');

const userSchema = new mongoose.Schema({
    groupname: {
        type: String,
        required: true,
        },
    adminSl: {
        type: String,
        required: true,
        },
    country : {
        type : String,
        required: true
    },
    purpose : {
        type : String,
        required: true
    },
    createdAt : {
        type : Date,
        default: Date.now
    }
    });
  
    const GroupDetails = mongoose.model('GroupDetails', userSchema);

    module.exports = GroupDetails;