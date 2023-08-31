const AcceptedReq = require('../Model/AcceptedReq');
const GroupDetails = require('../Model/GroupDetails');
const GroupMembers = require('../Model/GroupMembers');
const VerifiedUsers = require('../Model/VerifiedUsers');
const mongoose = require('mongoose');

async function GetAvailFriends(req, res, next){
    try{
        const {usersl} = req.params;
        const {group} = req.body;

        const groupExist = await GroupDetails.findById(group);
        if(groupExist){
            if(groupExist.adminSl == usersl){
                const allFriends = await AcceptedReq.find({$or : [{senderID: usersl},{recverID: usersl}]}).lean();

                if(allFriends){

                var myId = new Set();
                myId.add(usersl)
                var friendIDs = []

                await Promise.all(
                    allFriends.map((each)=>{
                        if(myId.has(each.senderID)){
                            friendIDs.push(each.recverID)
                        }else if(myId.has(each.recverID)){
                            friendIDs.push(each.senderID)
                        }
                    })
                )

                var friends = []
                const groupmemberDetails = await GroupMembers.find({groupSl : group}).lean()
                if(groupmemberDetails){
                    // we got at least one so we can search for all
                    // check if it has more members
                    
                    var filterGroupMember = new Set();

                    await Promise.all(
                        groupmemberDetails.map((each)=>{
                            if(!filterGroupMember.has(each.memberId)){
                                filterGroupMember.add(each.memberId)
                            }
                        })
                    )

                    var finalFriendIds = [];
                    await Promise.all(
                        friendIDs.map((each)=>{
                            if(!filterGroupMember.has(each)){
                                finalFriendIds.push(each)
                            }
                        })
                    )


                    await Promise.all(

                        finalFriendIds.map(async(each)=>{
                            const friendData = await VerifiedUsers.findById(each).lean();
                            friends.push(friendData)
                        })
                    )

                    
                    return res.status(200).json({
                        message : 'success',
                        friends : friends
                    })
                    

                }else{


                    await Promise.all(

                        friendIDs.map(async(each)=>{
                            const friendData = await VerifiedUsers.findById(each).lean();
                            friends.push(friendData)
                        })
                    )

                    
                    return res.status(200).json({
                        message : 'success',
                        friends : friends
                    })
                    
                }
                

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
        }else{
            return res.status(200).json({
                message : 'Failed'
            })
        }
    }catch(err){
        throw err
    }
}

module.exports = GetAvailFriends