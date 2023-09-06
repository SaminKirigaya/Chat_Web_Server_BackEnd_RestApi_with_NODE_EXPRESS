const TokenDatabase = require('../Model/TokenDatabase');
const LastLoggedIn = require('../Model/LastLoggedIn');
const VerifiedUsers = require('../Model/VerifiedUsers');
const ForgotPass = require('../Model/ForgotPass')
const AcceptedReq = require('../Model/AcceptedReq');

async function DeleteId(req, res, next){
    try{
        
        const {usersl} = req.params;

        const userExist = await VerifiedUsers.findById(usersl);
        if(userExist){
            await TokenDatabase.deleteOne({username : userExist.username});
            await LastLoggedIn.deleteMany({username : userExist.username});
            
            await ForgotPass.deleteOne({email : userExist.email});
            await VerifiedUsers.deleteOne({_id : usersl});


            // new feature after deleting id friend removing and old chats gone
            await AcceptedReq.deleteMany({$or : [{senderID : usersl},{recverID : usersl}]});

            return res.status(200).json({
                message : 'Successfully Deleted Account ... Thanks For Staying With Us All This Time.'
            })

        }else{
            return res.status(200).json({
                message : 'No Such User Exists In Server ...'
            })
        }

        
        

    }catch(err){
        throw err
    }
}

module.exports = DeleteId;