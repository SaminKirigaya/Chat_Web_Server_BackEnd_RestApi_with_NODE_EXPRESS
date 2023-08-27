const VerifiedUsers = require('../Model/VerifiedUsers');

async function GetUserName(req, res, next){
    try{
        const {usersl} = req.params;
        const user = await VerifiedUsers.findById(usersl);
        if(user){
            return res.status(200).json({
                message : 'success',
                username : user.username
            })
        }else{
            return res.status(200).json({
                message : 'Failed'
            })
        } 
    }catch(err){
        next(err)
    }
}

module.exports = GetUserName;