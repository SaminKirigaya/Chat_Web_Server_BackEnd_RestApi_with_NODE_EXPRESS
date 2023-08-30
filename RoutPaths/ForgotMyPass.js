const VerifiedUsers = require('../Model/VerifiedUsers');
const ForgotPass = require ('../Model/ForgotPass');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

// generating random pass of ur length of choice
function generateRandomPassword(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomPassword = "";
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      randomPassword += charset[randomIndex];
    }
  
    return randomPassword;
  }

// smtp 
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Set to true if you're using port 465 with SSL/TLS
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASS,
    },
  });



async function ForgotMyPass(req, res, next){
    try{
        const {email} = req.body;

        const restt = await VerifiedUsers.findOne({email : email});
        if(restt){
            var newPass = generateRandomPassword(20);
            var newPassHash = await bcrypt.hash(newPass,10);

            const mailOptions = {
                from: 'ChatHub', // Sender address (must be your Gmail address)
                to: `${email}`,           // Recipient address
                subject: 'Account verification code .',            // Subject of the email
                text: `Your New Password is: ${newPass}   You can login with it now ...`, // Email body in plain text
                
            };
    
            transporter.sendMail(mailOptions, async (error, info) => {
                if (error) {
                    return res.status(200).json({
                        message : 'Some Error Occured.'
                    })
                } else {
    

                     await ForgotPass.findOneAndUpdate(
              
                        { email: email }, // Replace with your condition
                      
                     
                        { $set: { pass: newPassHash } } // Replace with your update
                      );  
                      
                      
                      return res.status(200).json({
                        message : ' A New Password Was Sent To You In This Mail Succesfully .... Login With That From Now.'

                      })
                    
                }
            });
        }else{
            return res.status(200).json({
                message : 'Sorry No Such Email Exists In Our Database ...'
            })
        }
    }catch(err){
        throw err
    }
}

module.exports = ForgotMyPass