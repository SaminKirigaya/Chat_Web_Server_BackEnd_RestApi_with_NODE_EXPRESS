const Notifications = require('../Model/Notifications');


const getMyAmount = async (recver)=>{
    try{

       
        const totalAmount = await Notifications.find({recverID : recver});
        if(totalAmount){
            return    totalAmount.length
        
        }else{
            return  0
        }
        
    }catch(err){
        throw err
    }
}

module.exports={
    getMyAmount
};