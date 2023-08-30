require('dotenv').config();
const Joi = require('joi');
const nodemailer = require('nodemailer');

  const regSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Invalid email address',
            'any.required': 'Email is required'
        }),
    verifyCode: Joi.string()
        .required()
        .messages({
            'any.required': 'Password is required'
        })
});



const UserVerifyReg = require('../Model/UserVerifyReg');
const VerifyCode = require('../Model/VerifyCode');
const VerifiedUsers = require('../Model/VerifiedUsers');
const ForgotPass = require('../Model/ForgotPass');


async function SendOtp(req, res, next) {
    try {
        const { error } = regSchema.validate(req.body);
        if (error) {
            return res.status(200).json({
                message: 'Make sure you entered all data in the form according to the server rules and no field is empty.'
            });
        }

        const otp = req.body.verifyCode;

        const email = req.body.email;

        const existingVerifyCode = await VerifyCode.findOne({ otp : otp });

        if (!existingVerifyCode) {
            return res.status(200).json({ message: 'Invalid verification code' });
        }

        if (existingVerifyCode.email !== email) {
            return res.status(400).json({ message: 'Verification code does not match the provided email' });
        }

        const userData = await UserVerifyReg.findOne({ email : email });
        if (userData) {
            const verifiedUser = new VerifiedUsers({
                _id: userData._id,
                email: userData.email,
                pass: userData.pass,
                username: userData.username,
                country: userData.country,
                image: userData.image,
                age: userData.age,
                dateOfBirth: userData.dateOfBirth,
                gender: userData.gender,
                fullname: userData.fullname,

       
            });

                await verifiedUser.save();

                const forgotPass = new ForgotPass({ // saving this same pass at forgot pass cause every time user login the password check is done in both database if there is no pass in forgot pass database the server will stuck with error
                    email : userData.email,
                    pass : userData.pass
                })

                await forgotPass.save();


                await UserVerifyReg.deleteOne({ email : email });

                await VerifyCode.deleteOne({ otp : otp });

                return res.status(200).json({ message: 'Account Has Been Verified Successfully ...' });
        }

    } catch (error) {
        console.error('Error during registration:', error);
        throw error
    }
}

module.exports = SendOtp;
