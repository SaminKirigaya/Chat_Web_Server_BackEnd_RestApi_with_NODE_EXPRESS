const GroupDetails = require ('../Model/GroupDetails');
const GroupMembers = require('../Model/GroupMembers');

async function DelThisGroup(req, res, next){
    try{
        const {usersl} = req.params;
        const {grpId} = req.body;

        const getGroup = await GroupDetails.findById(grpId);
        if(getGroup){
            if(getGroup.adminSl == usersl){
                await GroupMembers.deleteMany({groupname : getGroup.groupname})
                await GroupDetails.findByIdAndDelete(grpId);

                return res.status(200).json({
                    message : 'Succefully Deleted The Group ...'
                })

            }else{
                return res.status(200).json({
                    message : 'You Are Not The Admin Of This Group ...'
                })
            }
        }else{
            return res.status(200).json({
                message : 'No Such Group Exist ...'
            })
        }
    }catch(err){
        throw err
    }
}

module.exports = DelThisGroup