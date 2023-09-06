require('dotenv').config();
const mongoose = require('mongoose');
const db = require('../Model/Db');

const GroupMessages = require('../Model/GroupMessages');
const GroupMembers = require('../Model/GroupMembers');


async function GetOldGroupConv(req, res, next){
    try{
        const {usersl} = req.params;
        const {Group} = req.body;

        const ismember = await GroupMembers.findOne({$and : [{memberId : usersl},{groupname : Group}]});
        if(ismember){
            const allMessages = await GroupMessages.find({groupname : Group});
            if(allMessages){
                return res.status(200).json({
                    message : 'success',
                    oldConv : allMessages
                })
            }else{

            }
            
        }else{
            return res.status(200).json({
                message : 'Failed'
            })
        }
           
        


    }catch(err){
        throw err
    }
}

module.exports = GetOldGroupConv;