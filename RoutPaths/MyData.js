const VerifiedUsers = require("../Model/VerifiedUsers");

async function MyData(req, res, next){
    try{
        const {usersl} = req.params;
        const userExist = await VerifiedUsers.findById(usersl);

        if(userExist){

            return res.status(200).json({
                message : 'success',
                userValue : userExist
            })

        }else{

            return res.status(200).json({
                message : 'Failed.'
            })

        }

    }catch(err){
        next(err)
    }
}

module.exports = MyData;