const CourseProgress = require("../models/CourseProgress")
const SubSection = require("../models/SubSection")

exports.updateCourseProgress = async(req, res) => {

    console.log("Controller tak aagaya ")

    const { courseId, subSectionId } = req.body
    const userId = req.user.id

    try{

        // check if the subsection is valid
        const subsection = await SubSection.findOne({ _id: subSectionId})
        if(!subsection) {
            return res.status(401).json({ error: "Invalid Sub Section" })
        }

        console.log(courseId, userId)

        // find the couse progress document for the user and course
        let courseProgress = await CourseProgress.findOne({
            courseID: courseId,
            userId: userId
        })

        

        console.log("course progress document",courseProgress)

        

        if (!courseProgress) {
            // If course progress doesn't exist create a new one
            return res.status(404).json({
                success: false,
                message: "Course progress does not exits"
            })
        } else {
            // if the course progress exist check if the subsection is already completed
            if( courseProgress.completeVideos.includes(subSectionId)) {
                return res.status(400).json({ error: "SubSection is already completed"})
            }

            // Push the subsection into the completed Videos array
            courseProgress.completeVideos.push(subSectionId)
        }

        //save the updated course Progress
        await courseProgress.save()

        await res.status(200).json({ message: "Course progress updated"})
    } catch(error){
        console.error("Cours progress api error",error)
        return res.status(500).json({
            success: false,
            message: "unable to update the course progress",
            error: error.message
        })
    }

}

exports.getCompletedLectures = async(req, res) => {
    try{
        const courseId = req.body.courseId
        console.log(req.body)
        const userId = req.user.id

        console.log("Here I am ", courseId ,userId)

        // check whether the course progress exist or not
        const courseProgress = await CourseProgress.findOne({courseID: courseId, userId: userId})

        if(!courseProgress){
            return res.status(404).json({
                success: false,
                message: "Unable to get course progress ",
            })
        }

        console.log("inside courseprogress controller",courseProgress)

        return res.status(200).json({
            success: true,
            data: courseProgress.completeVideos,
            message: "Completed video array sent successfully"
        })

    } catch(error){
        console.log("Error in getCompletedLectures",error)
        return res.status(500).success({
            success: false,
            message: "Unable to get completed lectures",
            error: error.message
        })
    }
}