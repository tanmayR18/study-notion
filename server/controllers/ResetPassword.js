const User = require('../models/User')
const mailSender = require('../utils/mailSender')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

//resetPasswordToken

exports.resetPasswordToken = async(req,res) => {
    try{
        //fetch the data from body
        const email = req.body.email
        //chec user for this email,email validation
        const user = await User.findOne({email:email})
        console.log(user)
        if(!user) {
            return res.status(401).json({
                success: false,
                message: 'Your email is not registered with us'
            })
        }

        //generate token
        const token = crypto.randomBytes(20).toString("hex");
        //update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate(
                                    {email:email},
                                    {
                                        token:token,
                                        resetPasswordExpires: Date.now() + 3600000
                                    },
                                    {new:true}
                                )
        console.log("updatedDetails",updatedDetails)
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

//resetPassword
exports.resetPassword = async(req,res) => {
    try{
        //data fetch
        //see how we can user params for getting the token 
        const {password, confirmPassword,token} = req.body
        console.log("Backend me ye mila he ", {password, confirmPassword,token})
        
        //validation
        if(password !== confirmPassword){
            return res.json({
                success:false,
                message:'Password not matching',
            });
        }

        //get userdetails from db using token
        const userdetails = await User.findOne({token:token})
        //if no enty- invalid
        if(!userdetails) {
            return res.json({
                success:false,
                message:'Token is invalid',
            });
        }
        //token time check
        if(userdetails.resetPasswordExpires < Date.now()){
            return res.json({
                success:false,
                message:'Token is expired, please regenerate your token',
            });
        }
        //hase password
        const encryptedPassword = await bcrypt.hash(password,10)

        //password update
        await User.findOneAndUpdate(
            {token:token},
            {password:encryptedPassword},
            {new:true}
        )

        //return response
        res.json({
            success:true,
            message:'password rest successfully',
            data:userdetails
        })

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while sending reset pwd mail'
        })
    }
}
