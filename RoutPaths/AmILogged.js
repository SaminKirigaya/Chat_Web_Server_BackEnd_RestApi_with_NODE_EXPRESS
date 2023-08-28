const TokenDatabase = require('../Model/TokenDatabase');

async function AmILogged(req, res, next){
    try{
        const {token} = req.params;
        const islogged = await TokenDatabase.findOne({token: token});
        if(islogged){
            return res.status(200).json({
                message : 'You are logged in.'
            })
        }else{
            return res.status(200).json({
                message : 'You are not logged in.'
            })
        }

    }catch(err){
        throw err
    }
}

module.exports = AmILogged;