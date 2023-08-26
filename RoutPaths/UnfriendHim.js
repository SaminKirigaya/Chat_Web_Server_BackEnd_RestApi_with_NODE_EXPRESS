const VerifiedUsers = require('../Model/VerifiedUsers');
const RequestSent = require('../Model/RequestSent');
const AcceptedReq = require('../Model/AcceptedReq');


async function UnfriendHim(req, res, next){
    try{
        const {usersl} = req.params;
        const {thisGuy} = req.body;

        const userExist = await VerifiedUsers.findById(thisGuy);
        if(userExist){
            await AcceptedReq.findOneAndDelete({
                $or: [
                    { $and: [{ senderID: usersl }, { recverID: thisGuy }] },
                    { $and: [{ recverID: usersl }, { senderID: thisGuy }] }
                ]
            });

            return res.status(200).json({
                message : 'Successfully Unfriended This User ...'
            })
        }else{
            return res.status(200).json({
                message : 'No Such User Exists ...'
            })
        }

    }catch(err){
        next(err)
    }
}

module.exports = UnfriendHim;