const {instance} = require('../config/razorpay')
const Course = require('../models/Course')
const User = require('../models/Course')
const mailSender = require('../utils/mailSender')
const {courseEnrollmentEmail} = require('../mail/templates/courseEnrollmentEmail')
const { default: mongoose } = require('mongoose')


//capture the payment and initiate the RazorPay order
exports.capturePayment = async(req, res) => {
    //get courseId and userId
    const {course_id} = req.body
    const userId = req.user.user.id;
    //validation
    //valid courseId 
    if(!course_id) {
        return res.json({
            success:false,
            message:'Please provide valid course ID',
        })
    };
    //valid course Details
    let course;
    try{
        course = await Course.findById(course_id)
        if(!course) {
            return res.json({
                success:false,
                message:'Could not find the course',
            });
        }

        //user already pay for the same course
        const uid = new mongoose.Types.ObjectId(userId)
        if(course.studentEnrolled.includes(uid)){
            return res.status(200).json({
                success:false,
                message:'Student is already enrolled',
            });
        }
    } catch(error){
            console.error(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            });
    }

    //creating an order
    const amount = course.price
    const currency = "INR"
    const options = {
        amount:amount*100,
        currency,
        //There should not be math.random() or there should be some modification 
        //else the receipt will be in decial number
        // Math.random(Date.now().toString()), --> Date.now().toString()
        receipt: Date.now().toString(),
        notes:{
            courseId:course_id,
            userId
        }
    }

    try{
        //initate the payment using razor pay
        const paymentResponse = await instance.orders.create(options)
        console.log(paymentResponse)
        //return response
        return res.status(200).json({
            success:true,
            courseName:course.courseName,
            courseDescription:course.courseDescription,
            thumbnail:course.thumbnail,
            orderId: paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount,
        })
    } catch(error) {
        console.log(error);
        res.json({
            success:false,
            message:"Could not initiate order",
        });
    }
}


//verify signature of razorpay and server

exports.verifySignature = async(req, res) => {
    const webhookSecret = '12345678'
    const signature = req.header["x-razorpay-signature"];
    
    const shasum = crypto.createHmac("sha256",webhookSecret)
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex")

    if(signature === digest){
        console.log("Payment authorised")
        const {courseId, userId} = req.body.payload.payment.entity.notes;

        try{
            //fulfil the action

            //find the course and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate(
                {_id: courseId},
                {$push:{studentsEnrolled: userId}},
                {new:true},
            );

            if(!enrolledCourse) {
            return res.status(500).json({
            success:false,
            message:'Course not Found',
            });
            }

            console.log(enrolledCourse);

            //find the student and add the course to their list enrolled courses me 
            const enrolledStudent = await User.findOneAndUpdate(
                            {_id:userId},
                            {$push:{courses:courseId}},
                            {new:true},
            );

            console.log(enrolledStudent);

            //send mail for successful purchasing of course to student
            const emailResponse = await mailSender(
                                        enrolledStudent.email,
                                        "Congratulations from Codehelp",
                                        courseEnrollmentEmail(courseId),    
                                    )
            console.log(emailResponse)
            return res.status(200).json({
                success:true,
                message:"Signature Verified and Course Added"
            })
        }catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            });
        }
    } else {
        return res.status(400).json({
            success:false,
            message:'Invalid request',
        });
    }
}