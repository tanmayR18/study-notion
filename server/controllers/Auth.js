const User = require('../model/User')
const OTP = require('../model/OTP')
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()


//send OTP
exports.sendOTP = async(req,res) => {
    try{
        //fetch email from request body
        const {email} = req.body

        //check if user already exist
        const checkUserPresent = await User.findOne({email})

        //if user already exits, then return a response
        if(checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: " User alreadu register "
            })
        }

        //generate otp
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        })
        console.log("OTP generated: ", otp)

        //check whether otp is unique or not
        let result = await OTP.findOne({otp: otp})

        while(result){
            var otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            })
            result = await OTP.findOne({otp: otp})
        }

        const otpPayload = {email, otp}

        //create an entry for OTP
        const otpBody = await OTP.create(otpPayload)
        console.log(otpBody)
        

        //return response successfully
        res.status(200).json({
            success:true,
            message:"OTP sent successfully",
            otp,
        })
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


//SignUp


//LogIn


//Resent Password