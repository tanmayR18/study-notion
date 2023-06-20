const Section = require('../model/Section')
const Course = require('../model/Course')

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
        const updatedCourseDetails = await Course.findById(
                                            courseId,
                                            {
                                                $push:{
                                                    courseContent:newSection._id
                                                }
                                            },
                                            {new:true}
                                        )
        //HW: use populate to replace section/subsection both in the updatedCourseDetails
        //return response
        return res.status(200).json({
            success:true,
            message:'Section created successfully',
            updatedCourseDetails,
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
        const {sectionName, sectionId} = req.body
        //data validation
        if(!sectionName || !sectionId) {
            return res.status(400).json({
                success:false,
                message:'Missing Properties',
            });
        }
        //update data
        const section = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true})
        //return res
        return res.status(200).json({
            success:true,
            message:'Section Updated Successfully',
        });
    } catch(error) {
        return res.status(500).json({
            success:false,
            message:"Unable to update Section, please try again",
            error:error.message,
        });
    }
}


