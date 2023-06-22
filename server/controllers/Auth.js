const User = require('../model/User')
const OTP = require('../model/OTP')
const Profile = require('../model/Profile')
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mailSender = require('../utils/mailSender')
const {passwordUpdated} = require('../mail/templates/passwordUpdate')
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
        const result = await OTP.findOne({otp: otp})
        console.log("Result is Generate OTP Func");
		console.log("OTP", otp);
		console.log("Result", result);
        // while(result){
        //     //here are some changes
        //     otp = otpGenerator.generate(6,{
        //         upperCaseAlphabets:false,
        //         lowerCaseAlphabets:false,
        //         specialChars:false
        //     })
        //     result = await OTP.findOne({otp: otp})
        // }
        while (result) {
			otp = otpGenerator.generate(6, {
				upperCaseAlphabets: false,
			});
		}
        const otpPayload = {email, otp}

        //create an entry for OTP
        const otpBody = await OTP.create(otpPayload)
        console.log("Otp body",otpBody);

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
exports.signup = async(req,res) => {
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
                return res.status(403).send({
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
        const existingUser = await User.findOne({email})
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
        } else if(otp !== recentOtp[0].otp) {
            //Invalid OTP
            return res.status(400).json({
                success:false,
                message:"Invalid OTP",
            });
        }

        //Hash Password
        const hasedPassowrd = await bcrypt.hash(password,10)

        // Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

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
            password:hasedPassowrd,
            accountType:accountType,
            approved:approved,
            additionalDetails: profileDetailts._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastName}`,
        })

        return res.status(200).json({
			success: true,
			user,
			message: "User registered successfully",
		});

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registrered. Please try again",
        })
    }
}


//LogIn
exports.login = async(req, res) => {
    try{
        //get data from the body
        const {email, password} = req.body;
        if(!email || !password){
            // Return 400 Bad Request status code with error message
            return res.status(400). json({
                success:false,
                message:'All fields are required, please try again',
            });
        }

        //user check exit or not
        const user = await User.findOne({email}).populate("additionalDetails")
        if(!user){
            // Return 401 Unauthorized status code with error message
            return res.status(401).json({
                success:false,
                message:"User is not registrered, please signup first",
            });
        }

        //generate JWT, after password matching
        if(await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                role: user.role
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn:"24h"
            })
            user.token = token
            user.password = undefined

            //create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true,
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:'Loged in successfully'
            })

        } else {
            return res.status(401).json({
                success:false,
                message:'Password is incorrect',
            });
        }

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login Failure, please try again',
        });
    }
}


//change Password
//TODO: Home work

    exports.changePassword = async(req,res) => {
        try{
            // fetch data from the body
            const {email, oldPassword, confirmPassword, newPassword} = req.body;
            
            //match the password 
            // - password entered by the user
            if(newPassword !== confirmPassword){
                return res.status(400).json({
                    success:false,
                    message: 'Enter the correct New and Confirm password properly'
                })

            }
            // - password comparison with db
            const userDetails = await User.findOne({email:email})
            if(!bcrypt.compare(oldPassword,userDetails.password)){
                return res.status(401).json({
                    success:false,
                    message: 'Enter the correct Old Password'
                })
            }
 
            // hashing of password and Update the db
            try{
                const hashedPassowrd = await bcrypt.hash(newPassword,10)
                const updatedUser = await User.findOneAndUpdate({email:email},
                    {password:hashedPassowrd},
                    {new:true})

                // Send notification email
                try {
                    const emailResponse = await mailSender(
                        updatedUserDetails.email,
                        //here are some changes
                        "Passord updated - Study Notion",
                        passwordUpdated(
                            updatedUserDetails.email,
                            `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                        )
                    );
                    console.log("Email sent successfully:", emailResponse.response);
                } catch (error) {
                    // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
                    console.error("Error occurred while sending email:", error);
                    return res.status(500).json({
                        success: false,
                        message: "Error occurred while sending email",
                        error: error.message,
                    });
                }

                return res.status(200).json({
                    success:true,
                    message:"Password updated successfully",
                    updatedUser
                })

            } catch( error) {
                console.log(error);
                return res.status(500).json({
                success:false,
                message:'Failed to update the new Password in DB',
                });
            }

            

        } catch( error ){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:'Unable to change the password, please try again',
            });
        }
    }