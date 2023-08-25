const TokenDatabase = require('../Model/TokenDatabase');
const LastLoggedIn = require('../Model/LastLoggedIn');
const VerifiedUsers = require('../Model/VerifiedUsers');


async function DeleteId(req, res, next){
    try{
        const authorizationHeader = req.headers['authorization'];
        const {usersl} = req.params;
        const token = authorizationHeader.split(' ')[1];

        const userExist = await VerifiedUsers.findById(usersl);
        if(userExist){
            await TokenDatabase.deleteOne({username : userExist.username});
            await LastLoggedIn.deleteOne({username : userExist.username});
            await VerifiedUsers.deleteOne({_id : usersl});

        }else{
            return res.status(200).json({
                message : 'No Such User Exists In Server ...'
            })
        }

        
        

    }catch(err){
        next(err)
    }
}

module.exports = DeleteId;