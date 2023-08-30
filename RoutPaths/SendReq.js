const VerifiedUsers = require('../Model/VerifiedUsers');
const RequestSent = require('../Model/RequestSent');
const AcceptedReq = require('../Model/AcceptedReq');

async function SendReq(req, res, next){
    try{
        const {usersl} = req.params;
        const {usersln} = req.body;

        const isvarified = await VerifiedUsers.findOne({_id : usersln});
        if(isvarified){
            // there are four consitions cause there are two case if u are a sender or u are a receiver and two databases one is already req sent but not accepted other is already accepted ....
            const alreadySent = await RequestSent.findOne({$and : [{ senderID:usersl },{ recverID:usersln }]});
            if(alreadySent){
                return res.status(200).json({
                    message : 'Already Friend Request Sent, Wait For The User To Accept It ...'
                })
            }

            const viceversasend = await RequestSent.findOne({$and : [{senderID : usersln},{recverID : usersl}]});
            if(viceversasend){
                return res.status(200).json({
                    message : 'This User Already Sent You A Request, You Can Accept That In Friend Request Page ...'
                })
            }

            const acceptedAlready = await AcceptedReq.findOne({$and : [{ senderID:usersl },{ recverID:usersln }]});
            if(acceptedAlready){
                return res.status(200).json({
                    message : 'This Person Is Already In Your Friend List ...'
                })
            }

            const viceversaacceptAlready = await AcceptedReq.findOne({$and : [{ senderID:usersln },{ recverID:usersl }]});
            if(viceversaacceptAlready){
                return res.status(200).json({
                    message : 'This Person Is Already In Your Friend List ...'
                })
            }


            const  sendReq = new RequestSent({
                senderID : usersl,
                recverID : usersln
            })

            await sendReq.save()

            return res.status(200).json({
                message : 'Successfully sent friend request, wait till the person accept it.'
            })

        }else{
            return res.status(200).json({
                message : 'No Such User Exists ...'
            })
        }

    }catch(err){
        throw err
    }
}

module.exports = SendReq