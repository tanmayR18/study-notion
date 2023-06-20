const Course = require('../model/Course')
const Tag = require('../model/Tags')
const User = require('../model/User')
const {uploadImageToCloudinary} = require('../utils/imageUploader')


//createCOurse handler funtion
exports.createCourse = async(req, res) => {
    try{
        //fetch data 
        const {courseName, courseDescription, whatYoutWillLearn, price, tag} = req.body

        //get thumbnail
        const thumbnail = req.files.thumbnailImage;

        //validation
        if(!courseName || !courseDescription || !whatYoutWillLearn || !price || !tag || !thumbnail) {
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            });
        }

        //check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId)
        console.log("Instructor Details:", instructorDetails)
        //TODO: Verify that userId and InstructorDetails._id are same or different ?

        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:'Instructor Details not found',
            });
        }

        //check given tag is valid or not
        const tagDetails = await Tag.findById(tag)
        if(!tagDetails) {
            return res.status(404).json({
                success:false,
                message:'Tag Details not found',
            });
        }

        //upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME)

        //create an entry for new Course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYoutWillLearn,
            price,
            tag:tagDetails._id,
            thumbnail:thumbnailImage.secure_url,
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

        //update the tag schema
        //TODO: HW
        //check whether there should me aarays of courses in tag
        await Tag.findOneAndUpdate(
            {name:tagDetails.name},
            {
                $push: {
                    course: newCourse.id
                }
            },
            {new:true}
        )

    } catch(erorr) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failed to create Course',
            error: error.message,
        })
    }
}

