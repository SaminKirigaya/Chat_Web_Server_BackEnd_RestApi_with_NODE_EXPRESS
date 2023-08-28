const VerifiedUsers = require('../Model/VerifiedUsers');

const LiveSenderData = async(param1)=>{
    try{
        const userdata = await VerifiedUsers.findById(param1);
        if(userdata){
            
            return userdata;
        }else{
            return null;
        }
    }catch(err){
        console.log(err)
        throw err
    }
}

module.exports = {
    LiveSenderData
};