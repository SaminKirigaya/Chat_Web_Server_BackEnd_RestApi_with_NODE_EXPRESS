const Notifications = require('../Model/Notifications');
const AllMessages = require('../Model/AllMessages');

const getCondition = async (sender, recver)=>{
    try{

            const recverwithwhom = await AllMessages.findOne({senderId : recver}).sort({ sendingtime: -1 });
            if(recverwithwhom){
               
                if(recverwithwhom.recverId != sender){
                    return true
                }else{
                    return false
                }
            }else{
                return false
            }
            
        
    }catch(err){
        throw err
    }
}

module.exports={
    getCondition
};