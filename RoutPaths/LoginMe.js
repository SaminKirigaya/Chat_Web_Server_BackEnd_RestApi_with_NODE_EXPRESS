require('dotenv').config();
const Joi = require('joi');
const VerifiedUsers = require('../Model/VerifiedUsers');
const TokenDatabase = require('../Model/TokenDatabase');
const bcrypt = require('bcrypt');
const {v4: uuidv4} = require('uuid');
const ForgotPass = require('../Model/ForgotPass')

const schema = Joi.object({
    email : Joi.string().email().required(),
    password : Joi.string().required()
})

async function LoginMe(req, res, next){
    try{
        const {error} = schema.validate(req.body);
        if(error){
            return res.status(200).json({
                message : 'Make Sure You Inserted All Values According To Server Rules And No Field Is Empty ...'
            })
        }

        const email = req.body.email;
        const password = req.body.password;

        const mailuser = await VerifiedUsers.findOne({email : email});
        if(!mailuser){
            return res.status(200).json({
                message : 'Invalid User Email ... No Such User Exists With This Mail.'
            })
        }
        const forgtPass = await ForgotPass.findOne({
            email : email
        })

        var pass = await bcrypt.compare(password, mailuser.pass);
        var forgotPass = await bcrypt.compare(password, forgtPass.pass);

        if(pass || forgotPass){
            const token = uuidv4();

            const isloggedIn = await TokenDatabase.findOne({username:mailuser.username});
            if(isloggedIn){
                await TokenDatabase.deleteOne({username:mailuser.username});
            }

            const insertToken = new TokenDatabase({
                token : token,
                username : mailuser.username
            })

            await insertToken.save();

            return res.status(200).json({
                message : 'Successfully Logged In ...',
                image : mailuser.image,
                token : token,
                usersl : mailuser._id
            })

        }else{
            return res.status(200).json({
                message : 'Invalid Password Inserted ... Make Sure To Check Case Of Letters.'
            })
        }





    }catch(err){
        throw err
    }

}

module.exports = LoginMe;