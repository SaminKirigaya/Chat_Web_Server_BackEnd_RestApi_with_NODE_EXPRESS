const VerifiedUsers = require('../Model/VerifiedUsers');
const GroupMembers = require('../Model/GroupMembers');
const GroupDetails = require('../Model/GroupDetails');


async function AddEmToGroup(req, res, next){
    try{
        const {usersl} = req.params;
        const {frndSl, groupID} = req.body;

        const isGroup = await GroupDetails.findById(groupID);
        if(isGroup){
            if(isGroup.adminSl == usersl){

                const isFriendReal = await VerifiedUsers.findById(frndSl);
                if(isFriendReal){

                    const   isAlreadyMember = await   GroupMembers.findOne({$and : [{groupSl : groupID},{memberId : frndSl}]});
                    if(!isAlreadyMember){
                        const addEmOmg = new GroupMembers({
                            groupname : isGroup.groupname,
                            adminSl : usersl,
                            groupSl : groupID,
                            memberId : frndSl
                        });

                        await addEmOmg.save();

                        return res.status(200).json({
                            message : 'success'
                        })

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
        }else{
            return res.status(200).json({
                message : 'Failed'
            })
        }
    }catch(err){
        throw err
    }
}

module.exports = AddEmToGroup;