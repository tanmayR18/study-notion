const Course = require('../models/Course')
const Category = require('../models/Category')
const User = require('../models/User')
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const {uploadImageToCloudinary} = require('../utils/imageUploader')
const { convertSecondsToDuration } = require('../utils/secToDuration')
const CourseProgress = require("../models/CourseProgress")


// Function to create a course
exports.createCourse = async(req, res) => {
    try{
        //fetch data 
        let {
            courseName, 
            courseDescription, 
            whatYouWillLearn,
            status, 
            price,
            //here are the changes
            tag: _tag, 
            category,
            instructions: _instructions
        } = req.body

        const userId = req.user.id;

        //get thumbnail
        const thumbnail = req.files.thumbnailImage;

        //COnvert the tag and instructions from stringified arrag to array
        const tag = JSON.parse(_tag)
        const instructions = JSON.parse(_instructions)

        console.log("tag", tag)
        console.log("instructions", instructions)

        //validation
        if(
            !courseName ||
            !courseDescription || 
            !whatYouWillLearn || 
            !price || 
            !tag.length ||
            !instructions.length ||
            !category || 
            !thumbnail) {
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            });
        }

        if (!status || status === undefined) {
			status = "Draft";
		}

        //check for instructor
        const instructorDetails = await User.findById(userId, {
			accountType: "Instructor",
		});
        console.log("Instructor Details:", instructorDetails)
        //TODO: Verify that userId and InstructorDetails._id are same or different ?

        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:'Instructor Details not found',
            });
        }

        //check given category is valid or not
        const categoryDetails = await Category.findById(category)
        if(!categoryDetails) {
            return res.status(404).json({
                success:false,
                message:'Category Details not found',
            });
        }

        //upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME)

        //create an entry for new Course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag,
            category:categoryDetails._id,
            thumbnail:thumbnailImage.secure_url,
            status: status,
			instructions,
        })

        //add the new course to the user schema of Instrutor
        await User.findByIdAndUpdate(
            {_id: instructorDetails.id},
            {
                $push: {
                    courses:newCourse._id
                }
            },
            {new:true}
        )

        //Here is some changes
        //update the category schema
        //TODO: HW
        //check whether there should me aarays of courses in category
        // await Category.findOneAndUpdate(
        //     {name:categoryDetails.name},
        //     {
        //         $push: {
        //             course: newCourse._id
        //         }
        //     },
        //     {new:true}
        // )
        // Return the new course and a success message

        // Add the new couese to the Categories
        const categoryDetails2 = await Category.findByIdAndUpdate(
            {_id: category},
            {
                $push:{
                    course: newCourse._id
                },
            },{new: true}
        )

		res.status(200).json({
			success: true,
			data: newCourse,
			message: "Course Created Successfully",
		});
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failed to create Course',
            error: error.message,
        })
    }
}

//Edit course details
exports.editCourse = async(req, res) => {
    try{
        const {courseId} = req.body
        const updates = req.body
        const course = await Course.findById(courseId)

        if(!course){
            return res.status(404).json({
                success:false,
                message: "Course Not found",
                error: "Course Not found"
            })
        }

        // If thumbnail image is found, update it 
        if(req.files){
            console.log("Thumbnail update")
            const thumbnail = req.files.thumbnailImage
            const thumbanailImage = await uploadImageToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            )
            course.thumbnail = thumbanailImage.secure_url
        }

        //update only the fields that are present in the request
        for(const key in updates) {
            if(updates.hasOwnProperty(key)){
                if(key === "tag" || key === "instruction") {
                    course[key] === JSON.parse(updates[key])
                } else {
                    course[key] = updates[key]
                }
            }
        }

        await course.save()

        const updatedCourse = await Course.findOne({
            _id: courseId,
        }).populate({
            path: "instructor",
            populate: {
                path: "additionalDetails"
            },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            }
        })
        .exec()

        res.json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse
        })

    } catch(error){
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        })
    }
}

//getAll courses 

exports.getAllCourses = async (req, res) => {
    try{
        //TODO: change the below statement incrementally
        const allCourses = await Course.find(
            { status: "Published"},
            {
				courseName: true,
				price: true,
				thumbnail: true,
				instructor: true,
				ratingAndReviews: true,
				studentsEnroled: true,
			}
        )
                .populate("instructor")
                .exec();
         
        return res.status(200).json({
            success:true,
            message:'Data for all courses fetched successfully',
            data:allCourses,
        })
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Cannot Fetch course data',
            error:error.message,
        })
    }
}

//getCourseDetails
exports.getCourseDetails = async (req, res) => {
    try {
            //get id
            const {courseId} = req.body;
            //find course details
            const courseDetails = await Course.find(
                                        {_id:courseId})
                                        .populate(
                                            {
                                                path:"instructor",
                                                populate:{
                                                    path:"additionalDetails",
                                                },
                                            }
                                        )
                                        .populate("category")
                                        // rating and review was commented before because it was giving a error
                                        .populate("ratingAndreviews")
                                        .populate({
                                            path:"courseContent",
                                            populate:{
                                                path:"subSection",
                                                select: "-videoUrl"
                                            },
                                        })
                                        .exec();

            //validation
            if(!courseDetails) {
                return res.status(400).json({
                success:false,
                    message:`Could not find the course with ${courseId}`,
                });
            }

                // if (courseDetails.status === "Draft") {
                //   return res.status(403).json({
                //     success: false,
                //     message: `Accessing a draft course is forbidden`,
                //   });
                // }

            let totalDurationInSeconds = 0
            courseDetails.courseContent.forEach( content => {
                content.subSection.forEach( subSection => {
                    const timeDurationInSeconds = parseInt(subSection.timeDuration)
                    totalDurationInSeconds += timeDurationInSeconds
                } )
            })

            const totalDuration = convertSecondsToDuration(totalDurationInSeconds)



            //return response
            return res.status(200).json({
                success:true,
                data: {
                    courseDetails,
                    totalDuration,
                },
                message:"Course Details fetched successfully",                    data:courseDetails,
            })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

//Get full course details
exports.getFullCourseDetails = async(req, res) => {
    try{
        const {courseId} = req.body
        const userId = req.user.id
        const courseDetails = await Course.findOne({
            _id: courseId
        }).populate({
            path: "instructor",
            populate: {
                path: "additionalDetails",
            },
        })
        .populate("category")
        .populate([{ path: "ratingAndReview", strictPopulate: false}])
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        }).exec()

        let courseProgressCount = await CourseProgress.findOne({
            courseID: courseId,
            userId: userId
        })

        console.log("Course Progress count", courseProgressCount)

        if(!courseDetails){
            return res.status(400).json({
                success: false,
                message:`Could not find course with id: ${courseId}`
            })
        }

        // if (courseDetails.status === "Draft") {
        //   return res.status(403).json({
        //     success: false,
        //     message: `Accessing a draft course is forbidden`,
        //   });
        // }

        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
            const timeDurationInSeconds = parseInt(subSection.timeDuration)
            totalDurationInSeconds += timeDurationInSeconds
        })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

        return res.status(200).json({
            success: true,
            data: {
                courseDetails,
                totalDuration,
                completedVideos: courseProgressCount?.completedVideos ?
                courseProgressCount?.completedVideos :
                []
            }
        })

    } catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//Get a list of Course for a given Instructor
exports.getInstructorCourses = async(req, res) => {
    try{
        const instructorId = req.user.id

        const instructorCourses = await Course.find({
            instructor: instructorId,
        }).sort({ createdAt: -1})

        // Return the instructor's courses
        res.status(200).json({
            success: true,
            data: instructorCourses
        })
    } catch(error){
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed to retrieve instructor courses",
            error: error.message
        })
    }
}

//Delete the course
exports.deleteCourse = async(req, res) => {
    try{
        const { courseId} = req.body

        // Find the course
        const course = await Course.findById(courseId)
        if(!course) {
            return res.status(404).json({
                success:false,
                message:"No such course found",
            })
        }

        //Unenroll students from the course
        const studentsEnrolled = course.studentEnrolled
        for(const studenId of studentsEnrolled){
            await User.findByIdAndUpdate(studenId, {
                $pull:{courses : courseId},
            })
        }

        // Delete section and subsection
        const courseSections = course.courseContent
        for(const sectionId of courseSections) {
            // Delete sub-section of the section
            const section = await Section.findById(sectionId)
            if(section){
                const subSection = section.subSection
                for(const subSectionId of subSection){
                    await SubSection.findByIdAndUpdate(subSectionId)
                }
            }
            //Delete the section
            await Section.findByIdAndDelete(sectionId)
        }

        // Delete the course 
        await Course.findByIdAndDelete(courseId)

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        })

    } catch(error){
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        })
    }
}

// Top 10 courses
exports.getTop10Courses = async(req, res) => {
    try{

        const top10course = await Course.aggregate([
            {
                $project: {
                    name: 1,
                    numberOfStudents: {$size: "$studentEnrolled"},
                },
            },
            {
                $sort: {numberOfStudents: -1}
            },
            {
                $limit: 10
            }
        ])

        return res.status(200).json({
            success: true,
            message: "Top 10 best selling courses fetched successfully",
            data: top10course
        })

    } catch(error){
        return res.status(500).json({
            success: false,
            message: "Unable to get the top 10 courses",
            error: error.message
        })
    }
}