const mongoose = require('mongoose')
const mailSender = require('../utils/mailSender')
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required:true,
    },
    createdAt: {
        type: String,
        //check whether changes is needed
        default: Date.now(),
        expires: 5*60,
    }
})


//function to send emails
async function sendVerificationEmail(email, otp){
    try{

        const mailResponse = await mailSender(email, 
            "Verification Email from StudyNotion",
            emailTemplate(otp))
        console.log("Email sent successfully", mailResponse.response)

    } catch (error) {
        console.log("error occured while sending mails", error)
        throw error
    }
}

otpSchema.pre("save",async function(next){
    console.log("New document saved to database");
    // Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
    next()
})

module.exports = mongoose.model("OTP", otpSchema)