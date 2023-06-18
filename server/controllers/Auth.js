const User = require('../model/User')
const OTP = require('../model/OTP')
const Profile = require('../model/Profile')
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
exports.signUp = async(req,res) => {
    try{

        //data fetch from the request body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body

        //validate data
        if (!firstName || !lastName || !email || !password || !confirmPassword
            || !accountType || !contactNumber || !otp ) {
                return res.status(403).json({
                    success: false,
                    message: "All the field are required"
                })
            }

        //match the twp password
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Passsowrd value does not match , please try again"
            })
        }

        //check user already exist or not
        const exisitngUser = await User.findOne({email})
        if(existingUser) {
            return res.status(400).json({
                success:false,
                message:'User is already registered',
            });
        }

        //find most recent otp stored for the user
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1)
        console.log("recent otp", recentOtp)

        //validate OTP 
        if(recentOtp.length == 0) {
            //OTP not found
            return res.status(400).json({
                success:false,
                message:'OTP not Found',
            })
        } else if(otp !== recentOtp.otp) {
            //Invalid OTP
            return res.status(400).json({
                success:false,
                message:"Invalid OTP",
            });
        }

        //Hash Password
        const hasedPassowrd = await bcrypt.hash(password,10)

        //entry created in DB
        const profileDetailts = await Profile.create({
            gender:null,
            dateOfBirth: null,
            about: null,
            contactNumber: null
        })

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password,
            password:hasedPassowrd,
            accountType,
            additionalDetails: profileDetailts._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastName}`,
        })

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registrered. Please try again",
        })
    }
}


//LogIn


//Resent Password