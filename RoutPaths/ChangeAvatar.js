const VerifiedUsers = require('../Model/VerifiedUsers');

async function ChangeAvatar(req, res, next){
    try{
        const {usersl} = req.params;
        const {imagelink} = req.body;

        const isUser = await VerifiedUsers.findById(usersl);
        if(isUser){
            await VerifiedUsers.findOneAndUpdate({_id : usersl},{
                $set : {
                    image : imagelink
                }
            },{
                new:true
            })
            .then(updatedUser => {
                return res.status(200).json({ message: 'User Avatar successfully updated ... Please log in again to confirm it was you ...' });
            })
            .catch(err => {
                console.error('Error updating user:', err);
                return res.status(200).json({ message: 'Error updating user, Please Try Later ...' });
            });


        }else{
            return res.status(200).json({
                message : 'You Are Not The User ...'
            })
        }
    }catch(err){
        res.status(200).json({
            message : err
        })
        next(err)
    }
}

module.exports = ChangeAvatar;