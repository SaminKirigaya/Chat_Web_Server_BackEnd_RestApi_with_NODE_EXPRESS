require('dotenv').config();
const Notifications = require('../Model/Notifications');

async function DelThisNoti(req, res, next){
    try{
        const {usersl} = req.params;
        const {notino} = req.body;
        const isitmine = await Notifications.findById(notino);
        if(isitmine){
            if(isitmine.recverID == usersl){
                await Notifications.findByIdAndDelete(notino);
                return res.status(200).json({
                    message : 'success'
                })
            }
        }
        
    }catch(err){
        throw err
    }
}

module.exports = DelThisNoti