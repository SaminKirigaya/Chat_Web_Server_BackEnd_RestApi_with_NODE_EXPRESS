const UserVerifyReg = require('../Model/UserVerifyReg');
const VerifyCode = require('../Model/VerifyCode');
const VerifiedUsers = require('../Model/VerifiedUsers');


const Joi = require('joi');


const regSchema = Joi.object({
    
    fullname: Joi.string()
        .pattern(/^([a-zA-Z ]+)$/)
        .required()
        .messages({
            'string.pattern.base': 'Full name can only contain letters and spaces',
            'any.required': 'Full name is required'
        }),
    country: Joi.string()
        .pattern(/^([a-zA-Z ]+)$/)
        .required()
        .messages({
            'string.pattern.base': 'Country can only contain letters and spaces',
            'any.required': 'Country is required'
        }),
    age: Joi.number()
        .integer()
        .min(7)
        .max(90)
        .required()
        .messages({
            'number.base': 'Age must be a valid number',
            'number.integer': 'Age must be an integer',
            'number.min': 'Age must be at least 7',
            'number.max': 'Age must not exceed 90',
            'any.required': 'Age is required'
        }),
    gender: Joi.string()
        .pattern(/^([a-zA-Z ]+)$/)
        .required()
        .messages({
            'string.pattern.base': 'Gender can only contain letters and spaces',
            'any.required': 'Gender is required'
        }),
    dateofBirth: Joi.date()
        .required()
        .messages({
            'date.base': 'Invalid date of birth',
            'any.required': 'Date of birth is required'
        })
});

async function ChangeUserData(req, res, next){
    const {usersl} = req.params;
    try{
        const {error} = regSchema.validate(req.body);
        if(error){
            return res.status(200).json({
                message : 'Make Sure To Insert All Datas According To Server Rules ... Dont Leave Any Field Empty.'
            })
        }

        const fullname = req.body.fullname;
        const country = req.body.country;
        const age = req.body.age;
        const gender = req.body.gender;
        const dateOfBirth = req.body.dateofBirth;


        VerifiedUsers.findOneAndUpdate(
            { _id: usersl }, // Find the user based on the identifier
            {
                $set: {
                    fullname: fullname,
                    country: country,
                    age: age,
                    gender: gender,
                    dateOfBirth: dateOfBirth
                }
            },
            { new: true } // To return the updated document
        )
        .then(updatedUser => {
            return res.status(200).json({ message: 'Successfully Updated Profile ... Kindly Login Again.' });
        })
        .catch(err => {
            console.error('Error updating user:', err);
            return res.status(200).json({ message: 'Error updating user, Please Try Later ...' });
        });
        

    }catch(err){
        throw err
    }
}

module.exports = ChangeUserData;