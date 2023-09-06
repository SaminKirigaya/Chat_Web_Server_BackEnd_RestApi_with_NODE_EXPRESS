const GroupMembers = require('../Model/GroupMembers');
const VerifiedUsers = require('../Model/VerifiedUsers');
const GroupDetails = require('../Model/GroupDetails');

async function kikEm(req, res, next){
    try{
        const {usersl} = req.params;
        const {username, groupname} = req.body;

        const ifAdmin = await GroupDetails.findOne({$and : [{groupname : groupname},{adminSl : usersl}]});
        if(ifAdmin){
            const userSl = await VerifiedUsers.findOne({username : username});
            if(userSl){
                await GroupMembers.deleteOne({$and : [{groupname : groupname},{memberId : userSl._id}]});
                return res.status(200).json({
                    message : 'success'
                })
            }else{
                return res.status(200).json({
                    message : 'No such users exist.'
                })
            }
        }else{
            return res.status(200).json({
                message : 'You are not an admin.'
            })
        }
    }catch(err){
        throw err
    }
}

module.exports = kikEm