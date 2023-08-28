require('dotenv').config();
const mongoose = require('mongoose');
const db = require('../Model/Db');
const AcceptedReq = require('../Model/AcceptedReq');
const AllMessages = require('../Model/AllMessages');

async function GetConv(req, res, next){
    try{
        const {usersl} = req.params;
        const {thisFriend} = req.body;
        const areFriend = await AcceptedReq.findOne({$or : [{
            $and : [{senderID : usersl},{recverID : thisFriend}]
        },{
            $and : [{senderID : thisFriend},{recverID : usersl}]
        }]});

        if(areFriend){

            const allMessages = await AllMessages.find({ $or : [{
                $and : [{senderId : usersl},{recverId : thisFriend}]
            },{
                $and : [{senderId : thisFriend},{recverId : usersl}]
            }]});

            if(allMessages){
                return res.status(200).json({
                    message : 'success',
                    oldConv : allMessages
                });
                
            }else{
                return res.status(200).json({
                    message : 'Failed'
                })
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

module.exports = GetConv;