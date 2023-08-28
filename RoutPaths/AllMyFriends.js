const VerifiedUsers = require('../Model/VerifiedUsers');
const AcceptedReq = require('../Model/AcceptedReq');
const mongoose = require('mongoose')

async function AllMyFriends(req, res, next){
    try{


        const {usersl} = req.params;
        var friendID = [];

        const friendIGot = await AcceptedReq.find({recverID : usersl}).lean();
        if(friendIGot){
            await Promise.all(
                friendIGot.map((each)=>{
                    friendID.push(each.senderID);
                })
            )
        }

        const friendISent = await AcceptedReq.find({senderID : usersl}).lean();
        if(friendISent){
            await Promise.all(
                friendISent.map((each)=>{
                    friendID.push(each.recverID);
                })
            )
        }

        if(friendID.length>0){

            
            const users = await VerifiedUsers.find({ _id: { $in: friendID } });

            return res.status(200).json({
                message : 'success',
                friends : users
            })
        }else{
            return res.status(200).json({
                message : 'Failed'
            })
        }


    }catch(err){
        throw err
    }
}

module.exports = AllMyFriends;