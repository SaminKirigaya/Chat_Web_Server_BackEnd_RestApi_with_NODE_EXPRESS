const VerifiedUsers = require('../Model/VerifiedUsers');
const RequestSent = require('../Model/RequestSent');
const AcceptedReq = require('../Model/AcceptedReq');


async function AcceptThisReq(req, res, next){
    try{
        const {usersl} = req.params;
        const {idno} = req.body;

        const isvalidReq = await RequestSent.findOne({ $and: [{ senderID:idno },{ recverID : usersl }] });
        if(isvalidReq){
            const newAdding = new AcceptedReq({
                senderID : idno,
                recverID : usersl
            });
            await newAdding.save();

            await RequestSent.findOneAndDelete({ $and : [{ senderID:idno },{ recverID : usersl }] })

            return res.status(200).json({
                message : 'Successfully Added This User To Your Friend List ... You Can Chat With Him Now .'
            })

        }else{
            return res.status(200).json({
                message : 'Sorry This User Never Sent You Request ...'
            })
        }

    }catch(err){
        throw err
    }
}

module.exports = AcceptThisReq;