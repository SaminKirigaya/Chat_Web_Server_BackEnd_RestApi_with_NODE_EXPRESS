const GroupMembers = require('../Model/GroupMembers');

const CheckIfMember = async(sender, groupname)=>{
    try{
        const ismember = await GroupMembers.findOne({$and : [{memberId : sender},{groupname : groupname}]});
        if(ismember){
            return true
        }else{
            return false
        }
    }catch(err){
        throw err
    }
}

module.exports={
    CheckIfMember
}