const GroupMembers = require('../Model/GroupMembers');
const VerifiedUsers = require('../Model/VerifiedUsers');
const GroupDetails = require('../Model/GroupDetails');

async function ShowMemberGroups (req, res, next){
    try{
        const {usersl} = req.params;
        const realUser = await VerifiedUsers.findById(usersl);
        if(realUser){
            const getData = await GroupMembers.find({memberId : usersl}).lean();

            if(getData){
                await Promise.all(
                    getData.map(async(each)=>{
                        var  getGroupData = await GroupDetails.findOne({groupname : each.groupname}).lean();
                        each.country = getGroupData.country;
                        each.purpose = getGroupData.purpose;
                        each.createdAt = getGroupData.createdAt;

                    })
                )



                return  res.status(200).json({
                    message : 'success',
                    mygroups : getData
                })
            }
        }else{
            return  res.status(200).json({
                message : 'Failed'
            })
        }
    }catch(err){
        throw err
    }
}

module.exports = ShowMemberGroups