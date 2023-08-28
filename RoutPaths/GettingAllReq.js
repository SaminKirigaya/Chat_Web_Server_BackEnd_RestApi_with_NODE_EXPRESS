const VerifiedUsers = require('../Model/VerifiedUsers');
const RequestSent = require('../Model/RequestSent');
const AcceptedReq = require('../Model/AcceptedReq');


async function GettingAllReq(req, res, next){
    try{
        const {usersl} = req.params;
        var allrequests = await RequestSent.find({recverID : usersl}).lean();

        
        if(allrequests){
            await Promise.all(
                allrequests.map(async(each)=>{
                    var sender = await VerifiedUsers.findById(each.senderID);
                    each.username = sender.username;
                    each.fullname = sender.fullname;
                    each.image = sender.image;
                    each.country = sender.country;
                    each.age = sender.age;
                    each.gender = sender.gender;
                })
                )
            return res.status(200).json({
                message : 'success',
                requests : allrequests
            })
        }else{
            return res.status(200).json({
                message : 'failed'
               
            })
        }
    }catch(err){
        throw err
    }
}

module.exports = GettingAllReq;