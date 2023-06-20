const SubSection = require('../model/SubSection')
const Seciton = require('../model/Section')


//create subsection
exports.createSubSection = async (req, res) => {
    try{
        //fetch the data from body
        const {sectionId, title, timeDuration, description} = req.body
        //extract file/video
        const video = req.files.videoFile
        //validation
        if(!sectionId || !title || !timeDuration || !description || !video) {
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            });
        }
        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME)
        //create subseciton
        const subSectionDetails = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl: uploadDetails.secure_url
        })
        //update section with this sub section ObjectID
        const updatedSection = await Seciton.findByIdAndUpdate({_id:sectionId},
                                                {
                                                    $push:{
                                                        SubSection:subSectionDetails._id
                                                    }
                                                },{new:true})
        //HW: log updated section here, after adding populate query
        //return response
        return res.status(200).json({
            succcess:true,
            message:'Sub Section Created Successfully',
            updatedSection,
        });
    } catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message,
        })
    }
}

//HW updateSubSection
exports.updateSubSection = async(req, res) => {
    try{
        //fetch data from the req body
        const {subSectionId, title, timeDuration, description} = req.body;
        //extract file/video
        //befor updating try to delete the existing video from the cloudinary
        const video  = req.files.videoFile;
        //validation
        if(!subSectionId || !title || !timeDuration || !description || !video) {
            return res.status(401).json({
                success:false,
                message:'All fields are required',
            });
        }
        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        //update the sub section content
        const updatedSubSection = await SubSection.findByIdAndUpdate(subSectionId,
                                                        {
                                                            title:title,
                                                            timeDuration:timeDuration,
                                                            description:description,
                                                            videoUrl:uploadDetails.secure_url
                                                        }
                                                    )
        //update subsection
        console.log("Updated Subsection", updatedSubSection)

        return res.status(200).json({
            succcess:true,
            message:"Sub Section updated successfully",
            updatedSubSection
        })
    } catch(error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message,
        })
    }
}

//delete Sub Section
exports.deleteSubSection = async (req, res) => {
    try{
        //fetch the data from the body
        const {subSectionId, sectionId} = req.body
        //validation
        if(!subSectionId || !sectionId) {
            return res.status(401).json({
                success:false,
                message:"Unable to get section and subsection id"
            })
        }
        //delete from subsection model
        const deletedSubSection = await SubSection.findByIdAndDelete(subSectionId)
        //console deleted sub section
        console.log(deletedSubSection)
        //update the corresponding section
        const updatedSection = await Seciton.findByIdAndUpdate(sectionId,
                                            {
                                                $pull: {subSection:subSectionId}
                                            })
        //console updatedSection
        console.log("Updated Section",updatedSection)
        //retrun response
        return res.status(200).json({
            success:true,
            message:"Sub section deleted successfully",
        })
    } catch(error){
        return res.status(501).json({
            success:false,
            message:"Failed to delete the sub section",
        })
    }
}