const {instance} = require('../config/razorpay')
const Course = require('../models/Course')
const User = require('../models/Course')
const mailSender = require('../utils/mailSender')
const {courseEnrollmentEmail} = require('../mail/templates/courseEnrollmentEmail')
const { default: mongoose } = require('mongoose')
const crypto = require('crypto')
const { paymentSuccessEmail } = require('../mail/templates/paymentSuccessEmail')



//initiate the razorpay order
exports.capturePayment = async(req, res) => {
    
    const { courses } = req.body
    const userId = req.user.id

    if( courses.length === 0){
        return res.json({
            success: false,
            message: "Please provide the course Id"
        })
    }

    let totalAmount = 0

    for(const course_id of courses) {
        let course;
        try{
            course = await Course.findById(course_id);
            if(!course){
                return res.status(200).json({
                    success: false,
                    message: 'Could not find the course'
                })
            }

            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentEnrolled.includes(uid)) {
                return res.status(200).json({
                    success: false,
                    message: "User is already enrolled in the course"
                })
            }

            totalAmount += course.price

        } catch(error){
            console.log(error)
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    const curreny = "INR"
    const options = {
        amount: totalAmount*100, 
        curreny,
        receipt: Math.random(Date.now()).toString()
    }

    try{
        const paymentResponse = await instance.orders.create(options)
        res.json({
            success: true,
            message: paymentResponse,
        })
    } catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Could not initiate order"
        })
    }
}

//Verify the payment
exports.verifyPayment = async(req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.courses;
    const userId = req.user.id

    if(
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature ||
        !courses || !userId
    ){
        return res.status(200).json({
            success: false,
            message: "Payment Failed"
        })
    }

    let body = razorpay_order_id + "|" + razorpay_signature
    const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex")

    if(expectedSignature === razorpay_signature){
        // enroll the students
        await enrollStudents(course, userId, res);

        // return res
        return res.status(200).json({
            success: true,
            message: 'Payment Verified'
        })
    }

    return res.status(200).json({
        success: false,
        message: 'Payment Failed'
    })
}


//function for sending mail to the user for confirming the payment
const enrollStudents = async(courses, userId, res) => {

    if( !courses || !userId){
        return res.status(400).json({
            success: false,
            message:"Please provide data for course or user id"
        })
    }

    for (const courseId of courses) {
        try{
            // find the course and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate(
                {_id: courseId},
                {$push: {studentEnrolled: userId}},
                {new: true}
            )

            if(!enrolledCourse){
                return res.status(500).json({
                    success: false,
                    message: "Could not found the course"
                })
            }

            //Find the student and add the course to their list of enrolled courses
            const enrolledStudent = await User.findByIdAndUpdate(
                userId,
                {$push: {courses: courseId}},
                { new :true}
            )

            // send Confirmation email to student
            const emailResponse = await mailSender(
                enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName, enrolledStudent.firstName)
            )

        } catch(error){
            console.log(error)
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
}

exports.sendPayemntSuccessEmail = async(req, res) => {
    
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id

    if(
        !orderId ||
        !paymentId ||
        !amount ||
        !userId
    ) {
        return res.status(400).json({
            success: false,
            message: "Please provide all the fields"
        })
    }

    try{
        const enrolledStudent = await User.findById(userId)
        await mailSender(
            enrolledStudent.email,
            "Payment Revieved",
            paymentSuccessEmail(enrolledStudent.firstName, 
            amount/100, orderId, paymentId    
            )
        )
    } catch(error){
        console.log("error in sending email", error)
        return res.status(500).json({
            success: false,
            message: "Could not send mail"
        })
    }
}

// //capture the payment and initiate the RazorPay order
// exports.capturePayment = async(req, res) => {
//     //get courseId and userId
//     const {course_id} = req.body
//     const userId = req.user.user.id;
//     //validation
//     //valid courseId 
//     if(!course_id) {
//         return res.json({
//             success:false,
//             message:'Please provide valid course ID',
//         })
//     };
//     //valid course Details
//     let course;
//     try{
//         course = await Course.findById(course_id)
//         if(!course) {
//             return res.json({
//                 success:false,
//                 message:'Could not find the course',
//             });
//         }

//         //user already pay for the same course
//         const uid = new mongoose.Types.ObjectId(userId)
//         if(course.studentEnrolled.includes(uid)){
//             return res.status(200).json({
//                 success:false,
//                 message:'Student is already enrolled',
//             });
//         }
//     } catch(error){
//             console.error(error);
//             return res.status(500).json({
//                 success:false,
//                 message:error.message,
//             });
//     }

//     //creating an order
//     const amount = course.price
//     const currency = "INR"
//     const options = {
//         amount:amount*100,
//         currency,
//         //There should not be math.random() or there should be some modification 
//         //else the receipt will be in decial number
//         // Math.random(Date.now().toString()), --> Date.now().toString()
//         receipt: Date.now().toString(),
//         notes:{
//             courseId:course_id,
//             userId
//         }
//     }

//     try{
//         //initate the payment using razor pay
//         const paymentResponse = await instance.orders.create(options)
//         console.log(paymentResponse)
//         //return response
//         return res.status(200).json({
//             success:true,
//             courseName:course.courseName,
//             courseDescription:course.courseDescription,
//             thumbnail:course.thumbnail,
//             orderId: paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount,
//         })
//     } catch(error) {
//         console.log(error);
//         res.json({
//             success:false,
//             message:"Could not initiate order",
//         });
//     }
// }


// //verify signature of razorpay and server

// exports.verifySignature = async(req, res) => {
//     const webhookSecret = '12345678'
//     const signature = req.header["x-razorpay-signature"];
    
//     const shasum = crypto.createHmac("sha256",webhookSecret)
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex")

//     if(signature === digest){
//         console.log("Payment authorised")
//         const {courseId, userId} = req.body.payload.payment.entity.notes;

//         try{
//             //fulfil the action

//             //find the course and enroll the student in it
//             const enrolledCourse = await Course.findOneAndUpdate(
//                 {_id: courseId},
//                 {$push:{studentsEnrolled: userId}},
//                 {new:true},
//             );

//             if(!enrolledCourse) {
//             return res.status(500).json({
//             success:false,
//             message:'Course not Found',
//             });
//             }

//             console.log(enrolledCourse);

//             //find the student and add the course to their list enrolled courses me 
//             const enrolledStudent = await User.findOneAndUpdate(
//                             {_id:userId},
//                             {$push:{courses:courseId}},
//                             {new:true},
//             );

//             console.log(enrolledStudent);

//             //send mail for successful purchasing of course to student
//             const emailResponse = await mailSender(
//                                         enrolledStudent.email,
//                                         "Congratulations from Codehelp",
//                                         courseEnrollmentEmail(courseId),    
//                                     )
//             console.log(emailResponse)
//             return res.status(200).json({
//                 success:true,
//                 message:"Signature Verified and Course Added"
//             })
//         }catch(error){
//             console.log(error);
//             return res.status(500).json({
//                 success:false,
//                 message:error.message,
//             });
//         }
//     } else {
//         return res.status(400).json({
//             success:false,
//             message:'Invalid request',
//         });
//     }
// }