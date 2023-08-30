const InOutMsgBox = require('../Model/InOutMsgBox');

const checkwhereUser = async(recver)=>{
    try{
        const rec = await InOutMsgBox.findOne({userId : recver});
        if(rec){
            if(rec.status == 'Inside'){
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

module.exports ={
    checkwhereUser
}