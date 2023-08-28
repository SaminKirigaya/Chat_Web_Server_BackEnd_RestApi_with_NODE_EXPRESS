require('dotenv').config();
const Notifications = require('../Model/Notifications');


async function GetNotis (req, res, next){

    try{ 
        const {usersl} = req.params;
        const havenoti = await Notifications.find({recverID : usersl});
        if(havenoti){
            return res.status(200).json({
                message : 'success',
                notis : havenoti
            })
        }else{
            return res.status(200).json({
                message : 'Failed'
            })
        }

    }catch(err){
        throw err
    }
} 


module.exports = GetNotis