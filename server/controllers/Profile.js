const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const Profile = require("../models/Profile");
const RatingAndReview = require("../models/RatingAndReview");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");
// Method for updating a profile
exports.updateProfile = async (req, res) => {
	try {
		const { dateOfBirth = "", about = "", contactNumber,gender="", firstName="", lastName="" } = req.body;
		const id = req.user.id;

		// Find the profile by id
		const userDetails = await User.findById(id);
		const profile = await Profile.findById(userDetails.additionalDetails);

		// Update the profile fields
		profile.dateOfBirth = dateOfBirth;
		profile.about = about;
		profile.contactNumber = contactNumber;
		profile.gender = gender;

        // Update the User Fields
        userDetails.firstName = firstName;
        userDetails.lastName = lastName;

		// Save the updated profile
		await profile.save();

        // Save the updated profile
		await userDetails.save();

		return res.json({
			success: true,
			message: "Profile updated successfully",
			updatedUserDetails: Object.assign(profile, userDetails)
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

exports.deleteAccount = async (req, res) => {
	try {
		// TODO: Find More on Job Schedule
		// const job = schedule.scheduleJob("10 * * * * *", function () {
		// 	console.log("The answer to life, the universe, and everything!");
		// });
		// console.log(job);
        console.log("Inside deleted Account controller")
		const id = req.user.id;
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});  
		}
		// Delete Assosiated Profile with the User
		await Profile.findByIdAndDelete(user.additionalDetails);

        // TODO: Unenroll User From All the Enrolled Courses
        
        // Delete all the users rating and review
        await RatingAndReview.deleteMany({user: id})

        // Unenroll user from all the courses
        if(user.courses.length > 10){
            for(const course of user.courses){
                await Course.findByIdAndUpdate(
                    { _id: course },
                    {
                      $pull: {
                        studentEnrolled: id,
                      },
                    }
                  )
            }
        }
        
        // Delete courseProgress of the user
        await CourseProgress.deleteMany({userId: id})

		// Now Delete User
		await User.findByIdAndDelete({ _id: id });
		res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ success: false, message: "User Cannot be deleted successfully" });
	}
};

exports.getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();
		console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.status(200).json({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  
exports.getEnrolledCourses = async (req, res) => {
    try {
        console.log("Inside get enrolled courses")
      const userId = req.user.id
      let userDetails = await User.findOne({
        _id: userId,
      })
        .populate({
            path: "courses",
            populate: {
                path: "courseContent",
                populate: {
                    path: "subSection"
                }
            }
        })
        .exec()

        userDetails = userDetails.toObject()
        var SubSectionLength = 0
        for( var i = 0; i < userDetails.courses.length ; i++){
            let totalDurationInSeconds = 0
            SubSectionLength = 0
            for ( var j = 0; j < userDetails.courses[i].courseContent.length; j++){
                totalDurationInSeconds += userDetails.courses[i].courseContent[
                    j
                ].subSection.reduce( (acc, curr) => acc + parseInt(curr.timeDuration), 0)
                userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds)
                SubSectionLength += 
                userDetails.courses[i].courseContent[j].subSection.length
            }
            let courseProgressCount = await CourseProgress.findOne({
                courseID: userDetails.courses[i]._id,
                userId: userId,
            })

            courseProgressCount = courseProgressCount?.completeVideos.length
            if(SubSectionLength === 0){
                userDetails.courses[i].progressPercentage = 100
            } else {
                const multiplier = Math.pow(10,2)
                userDetails.courses[i].progressPercentage = 
                Math.round(
                    (courseProgressCount / SubSectionLength) * 100 * multiplier
                ) / multiplier
            }

        }

      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        message:"Enrolled courses fetched successfully",
        data: userDetails.courses,
      })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

exports.instructorDashboard = async (req, res) => {
    try{    
        const courseDetails = await Course.find({ instructor: req.user.id})
        
        const courseData = courseDetails.map( course => {
            const totalStudentsEnrolled = course.studentEnrolled.length
            const totalAmountGenerated = totalStudentsEnrolled * course.price

            //create a new object with additional field
            const courseDataWithStats = {
                _id: course.id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenerated
            }

            return courseDataWithStats
        })

        res.status(200).json({
            success :true ,
            courses: courseData,
            message: "Instructors's course details fetched successfully"
        })

    } catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            error: error.message,
            message: "Server error"
        })
    }
}