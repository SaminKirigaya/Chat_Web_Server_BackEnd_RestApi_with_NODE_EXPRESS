const VerifiedUsers = require('../Model/VerifiedUsers');
const TokenDatabase = require('../Model/TokenDatabase');


const AuthenLiveServer = async(param1, param2)=>{
    try{

    
        
        const isinToken = await TokenDatabase.findOne({token : param2});

        if(isinToken){

            const  serialExist = await VerifiedUsers.findById(param1);

            if(serialExist){

                if(isinToken.username == serialExist.username){
                    return true;
                }else{
                    return false;
                }

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


module.exports = {
    AuthenLiveServer
  };