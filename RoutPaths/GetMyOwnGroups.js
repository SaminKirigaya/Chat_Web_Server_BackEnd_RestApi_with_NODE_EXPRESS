const GroupDetails = require('../Model/GroupDetails');

async function GetMyOwnGroups(req, res, next){
    try{
        const {usersl} = req.params;
        const owngroups = await GroupDetails.find({
            adminSl : usersl
        });
        if(owngroups){
            return res.status(200).json({
                message : 'success',
                allgroupmy : owngroups
            })
        }else{
            return res.status(200).json({
                message : 'Failed'
            })
        }
    }catch(err){
        throw err;
    }
}

module.exports = GetMyOwnGroups;