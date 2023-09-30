const Section = require('../models/Section')
const Course = require('../models/Course')
const SubSection = require("../models/SubSection")

exports.createSection = async(req, res) => {
    try{
        //data fetch
        const {sectionName, courseId} = req.body;
        //date validation 
        if(!sectionName || !courseId) {
            return res.status(400).json({
                success:false,
                message:'Missing Properties',
            });
        }

        //create seciton
        const newSection = await Section.create({sectionName})
        //update course with section Object ID
        const updatedCourse = await Course.findByIdAndUpdate(
                                            courseId,
                                            {
                                                $push:{
                                                    courseContent:newSection._id
                                                }
                                            },
                                            {new:true}
                                        )
                                        .populate({
                                            path: "courseContent",
                                            populate: {
                                                path: "subSection",
                                            },
                                        })
                                        .exec();
        //HW: use populate to replace section/subsection both in the updatedCourseDetails
        //return response
        return res.status(200).json({
            success:true,
            message:'Section created successfully',
            updatedCourse,
        })
    } catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to create Section, please try again",
            error:error.message,
        });
    }
}


exports.updateSection = async(req, res) => {
    try{
        //data input
        const {sectionName, sectionId, courseId } = req.body
        //data validation
        if(!sectionName || !sectionId) {
            return res.status(400).json({
                success:false,
                message:'Missing Properties',
            });
        }
        //update data
        const section = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true})

        //updated course
        const course = await Course.findById(courseId)
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        }).exec()

        //return res
        return res.status(200).json({
            success:true,
            message:'Section Updated Successfully',section,
            data: course
        });
    } catch(error) {
        return res.status(500).json({
            success:false,
            message:"Unable to update Section, please try again",
            error:error.message,
        });
    }
}


exports.deleteSection = async (req, res) => {
    try{
        //get ID - assuming that we are sending ID in params
        const {sectionId, courseId} = req.params
        // const {courseId} = req.body
        // console.log(
        //     "params",paramsValue
        // )
        //delete section id from course model
        await Course.findByIdAndUpdate(
                                courseId,
                                {
                                    $pull:{courseContent:sectionId}
                                }
        )

        //Check if the course is present
        const section = await Section.findById(sectionId)
        console.log(sectionId, courseId)

        if(!section){
            return res.status(404).json({
                success: false,
                message: "Section not found",
            })
        }

        //delete subsubsection
        await SubSection.deleteMany({_id: {$in: section.subSection}})

        //delete the section
        await Section.findByIdAndDelete(sectionId);
        //TODO[Testing]: do we need to delete the entry from the course schema ??
        
        //find the updated course and return 
        const course = await Course.findById(courseId).populate({
            path:"courseContent",
            populate: {
                path: "subSection"
            }
        }).exec()

        //return response
        return res.status(200).json({
            success:true,
            message:"Section Deleted Successfully",
            data: course
        })
    } catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to delete Section, please try again",
            error:error.message,
        });
    }
}


