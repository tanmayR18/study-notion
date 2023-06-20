const Course = require('../model/Course')
const Category = require('../model/Category')
const User = require('../model/User')
const {uploadImageToCloudinary} = require('../utils/imageUploader')


//createCOurse handler funtion
exports.createCourse = async(req, res) => {
    try{
        //fetch data 
        const {courseName, courseDescription, whatYoutWillLearn, price, category} = req.body

        //get thumbnail
        const thumbnail = req.files.thumbnailImage;

        //validation
        if(!courseName || !courseDescription || !whatYoutWillLearn || !price || !category || !thumbnail) {
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
            whatYouWillLearn: whatYoutWillLearn,
            price,
            category:categoryDetails._id,
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

        //update the category schema
        //TODO: HW
        //check whether there should me aarays of courses in category
        await Category.findOneAndUpdate(
            {name:categoryDetails.name},
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

//getAll courses 

exports.showAllCourses = async (req, res) => {
    try{
        //TODO: change the below statement incrementally
        const allCourses = await Course.find({});
         
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