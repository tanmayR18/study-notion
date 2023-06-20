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