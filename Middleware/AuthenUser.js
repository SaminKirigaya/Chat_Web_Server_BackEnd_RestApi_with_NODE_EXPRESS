const VerifiedUsers = require('../Model/VerifiedUsers');
const TokenDatabase = require('../Model/TokenDatabase');


async function AuthenUser(req, res, next){
    try{

        const authorizationHeader = req.headers['authorization'];
        const {usersl} = req.params;
        const token = authorizationHeader.split(' ')[1];
        
        const isinToken = await TokenDatabase.findOne({token : token});

        if(isinToken){

            const  serialExist = await VerifiedUsers.findById(usersl);

            if(serialExist){

                if(isinToken.username == serialExist.username){
                    next();
                }else{
                    return  res.status(200).json({
                        message : 'User Is Not Authenticated !!!'
                    })
                }

            }else{
                return  res.status(200).json({
                    message : 'Failed.'
                })
            }

        }else{
            return  res.status(200).json({
                message : 'Failed.'
            })
        }

    }catch(err){
        next(err);
    }
    

    
}

module.exports = AuthenUser;