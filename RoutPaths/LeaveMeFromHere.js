const   GroupMembers = require('../Model/GroupMembers');

async function LeaveMeFromHere(req, res, next){
    try{
        const {usersl} = req.params;
        const {groupname} = req.body;

        const canILeave = await GroupMembers.findOne({$and : [{$and : [{memberId : usersl},{groupname : groupname}]},{adminSl : {$ne : usersl}}]});
        if(canILeave){
            await GroupMembers.findOneAndDelete({$and : [{$and : [{memberId : usersl},{groupname : groupname}]},{adminSl : {$ne : usersl}}]});

            return res.status(200).json({
                message : 'Successfully Left This Group ...'
            })

        }else{
            return res.status(200).json({
                message : 'Some Error Occured ... Either You Are Not The User Of This Group Anymore OR You Are The Admin Of This Group .'
            })
        }
    }catch(err){
        throw err
    }
}

module.exports=LeaveMeFromHere