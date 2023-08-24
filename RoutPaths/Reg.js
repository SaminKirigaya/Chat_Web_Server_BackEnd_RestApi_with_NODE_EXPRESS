require('dotenv').config();
const Joi = require('joi');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');


function generateRandomPassword(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomPassword = "";
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      randomPassword += charset[randomIndex];
    }
  
    return randomPassword;
  }


  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Set to true if you're using port 465 with SSL/TLS
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASS,
    },
  });



  const regSchema = Joi.object({
    username: Joi.string()
        .pattern(/^([a-zA-Z0-9]+)$/)
        .required()
        .messages({
            'string.pattern.base': 'Username can only contain letters, numbers, and spaces',
            'any.required': 'Username is required'
        }),
    fullname: Joi.string()
        .pattern(/^([a-zA-Z ]+)$/)
        .required()
        .messages({
            'string.pattern.base': 'Full name can only contain letters and spaces',
            'any.required': 'Full name is required'
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Invalid email address',
            'any.required': 'Email is required'
        }),
    password: Joi.string()
        .pattern(/^([a-zA-Z0-9*!@]+){6,50}$/)
        .required()
        .messages({
            'string.pattern.base': 'Password must be 6-50 characters long and can only contain letters, numbers, *, !, and @',
            'any.required': 'Password is required'
        }),
    confirm_password: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': 'Passwords do not match',
            'any.required': 'Please confirm your password'
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



const UserVerifyReg = require('../Model/UserVerifyReg');
const VerifyCode = require('../Model/VerifyCode');
const VerifiedUsers = require('../Model/VerifiedUsers');


async function Reg(req, res, next) {
    try {
        const { error } = regSchema.validate(req.body);
        if (error) {
            return res.status(200).json({
                message: 'Make sure you entered all data in the form according to the server rules and no field is empty.'
            });
        }

        const username = req.body.username;
        const password = req.body.password; // Removed the unnecessary password reassignment

        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt); // Use a different variable to store the hashed password

        const email = req.body.email;
        const fullname = req.body.fullname;
        const country = req.body.country;
        const age = req.body.age;
        const gender = req.body.gender;
        const dateofBirth = req.body.dateofBirth;

        // Check if username is taken
        const existingUser = await UserVerifyReg.findOne({ username: username });
        if (existingUser) {
            return res.status(200).json({
                message: 'Username has already been taken.'
            });
        }

        // Check if email is taken in either UserVerifyReg or VerifiedUsers
        const existingEmail = await Promise.any([
            UserVerifyReg.findOne({ email: email }),
            VerifiedUsers.findOne({ email: email })
        ]);

        if (existingEmail) {
            return res.status(200).json({
                message: 'Email is already in use.'
            });
        }

        // Proceed with saving the user and sending the verification email
        const newUser = new UserVerifyReg({
            email: email,
            pass: hashedPassword, // Use the hashed password
            username: username,
            image: 'http://localhost:8000/public/images/cat1.jpg',
            country: country,
            age: age,
            dateOfBirth: dateofBirth,
            gender: gender,
            fullname: fullname
        });

        await newUser.save();

        // Generate and send verification code via email
        const verifyCode = generateRandomPassword(15);
        // Rest of your email sending logic here...
        const mailOptions = {
            from: 'ChatHub', // Sender address (must be your Gmail address)
            to: `${email}`,           // Recipient address
            subject: 'Account verification code .',            // Subject of the email
            text: `Your verification code is: ${verifyCode}. At verify email page verifying your account email so that you can log in.`, // Email body in plain text
            
        };

        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                return res.status(200).json({
                    message : 'Some Error Occured.'
                })
            } else {

                const otp = new VerifyCode({
                    email: email,
                    otp: verifyCode
                });

                otp.save()
                    .then(success => {
                        return res.status(200).json({
                            message : 'You Are Sent A Verifying Code in Your Mail ... Verify In Email Verify Page.'
                        })
                    })
                    .catch(error => {
                        return res.status(200).json({
                            message : 'Some Error Occured ...'
                        })
                    })
                
            }
        });


    } catch (error) {
        console.error('Error during registration:', error);
        next(error)
    }
}

module.exports = Reg;
