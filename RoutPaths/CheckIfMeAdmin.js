const GroupDetails = require('../Model/GroupDetails');

async function CheckIfMeAdmin (req, res, next){
    try{
        const {serial, group} = req.body;
        const ifTrue = await GroupDetails.findOne({$and : [{groupname : group},{adminSl : serial}]});
        if(ifTrue){
            return res.status(200).json({
                message : 'Yes'
            })
        }else{
            return res.status(200).json({
                message : 'No'
            })
        }
    }catch(err){
        throw err
    }
}

module.exports = CheckIfMeAdmin