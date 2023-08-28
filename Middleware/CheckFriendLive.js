
const AcceptedReq = require('../Model/AcceptedReq')

const CheckFriendLive = async(param1, param2)=>{
    try{

        const sendercond1 = await AcceptedReq.findOne({$and : [{senderID : param1},{recverID : param2}]});
        const sendercond2 = await AcceptedReq.findOne({$and : [{senderID : param2},{recverID : param1}]});

        if(sendercond1){
            return true;
        }else if(sendercond2){
            return true;
        }else{
            return false;
        }

    }catch(err){
        throw err
    }
    

    
}


module.exports = {
    CheckFriendLive
  };