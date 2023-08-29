const Notifications = require('../Model/Notifications');

async function GetTotalNumbers(req, res, next){
    try{
        const {usersl} = req.params;
        const totalAmount = await Notifications.find({recverID : usersl});
        if(totalAmount){
            return res.status(200).json({
                message : 'success',
                amount : totalAmount.length
            })
        }else{
            return res.status(200).json({
                message : 'failed',
                
            })
        }
    }catch(err){
        throw err
    }
}

module.exports = GetTotalNumbers