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
    groupSl: {
        type : String,
        required : true,
    },
    memberId: {
        type : String,
        required: true
    }
    });
  
    const GroupMembers = mongoose.model('GroupMembers', userSchema);

    module.exports = GroupMembers;