const TokenDatabase = require('../Model/TokenDatabase');
const LastLoggedIn = require('../Model/LastLoggedIn');

async function LogOut(req, res, next){
    try{
        const authorizationHeader = req.headers['authorization'];
        const {usersl} = req.params;
        const token = authorizationHeader.split(' ')[1];

        const isLoggedIn = await TokenDatabase.findOne({token : token});

        if(isLoggedIn){
            
            const alreadyExist = await LastLoggedIn.findOne({username : isLoggedIn.username});
            if(alreadyExist){
                await LastLoggedIn.deleteMany({username : isLoggedIn.username});
            }

            const lastonline = new LastLoggedIn({
                username : isLoggedIn.username
            })

            await lastonline.save();

            await TokenDatabase.deleteOne({token : token});

            return res.status(200).json({
                message : 'Successfully Logged Out ...'
            })
            
        }else{
            return res.status(200).json({
                message : 'You are not even logged in ....'
            })
        }

    }catch(err){
        throw err
    }
}

module.exports = LogOut;