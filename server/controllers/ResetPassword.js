const User = require('../model/User')
const mailSender = require('../utils/mailSender')
const bcrypt = require('bcrypt')

//resetPasswordToken

exports.resetPasswordToken = async(req,res) => {
    try{
        //fetch the data from body
        const email = req.body.email
        //chec user for this email,email validation
        const user = await User.findOne({email:email})
        if(!user) {
            return res.status(401).json({
                success: false,
                message: 'Your email is not registered with us'
            })
        }

        //generate token
        const token = crypto.randomUUID();
        //update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate(
                                    {email:email},
                                    {
                                        token:token,
                                        resetPasswordExpires: Date.now() + 5*60*1000
                                    },
                                    {new:true}
                                )
        
        //create url
        const url = `http://localhost:3000/update-password/${token}`
        //send mail containg the url
        await mailSender(email,
                        "Password Reset Link",
                        `Password Reset Link: ${url}`);
        //return response
        return res.json({
            success:true,
            message:'Email sent suceessfully, please check email and change you password'
        })
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while sending reset pwd mail'
        })
    }
}


