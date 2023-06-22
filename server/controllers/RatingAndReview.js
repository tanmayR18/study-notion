const RatingAndReview = require('../model/RatingAndReview')
const Course = require('../model/Course')


//create rating
exports.createRating = async (req, res) => {
    try{

        //get user id
        const userId = req.user.id;
        //fetch data from req body
        const {rating, review, courseId} = req.body
        //check if user is enrolled in course or not
        const courseDetails = await Course.findOne(
                                    {
                                        _id:courseId,
                                        studentEnrolled:{$elemMatch: {$ep:userId}}
                                    }
                            )
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message: "Student is not enrolled in the course",
            })
        }
        //check if user already reviewed the course
        const alreadyReviewed  = await RatingAndReview.findOne({
                                                user:userId,
                                                course:courseId,      
                                            })
        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:"Course is already reviewed by the user",
            })
        }
        //create rating and review
        const ratingReview = await RatingAndReview.create({
                                                rating,review,
                                                course:courseId,
                                                user:userId
                                            })
        //update course with this rating/review
        const updatedCourseDetails = await Course.findByIdAndUpdate({
                                                $push: {
                                                    ratingReview:ratingReview._id
                                                }
                                            },
                                            {new:true}
                                        )
        console.log(updatedCourseDetails)
        //return response 
        return res.status(200).json({
            success:true,
            message:"Rating and review created successfully",
            ratingReview
        })
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}
