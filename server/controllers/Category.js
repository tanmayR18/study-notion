const Category = require('../models/Category')

function getRandomInt(max){
    return Math.floor(Math.random() * (max));
}

//create Category

exports.createCategory = async (req,res) => {
    try{
        //fetch data 
        const {name, description} = req.body
        //validation
        if(!name){
            return res.json(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        //create entry in DB
        const CategoryDetails = await Category.create({
            name:name,
            description:description
        })
        console.log(CategoryDetails)

        return res.status(200).json({
            success:true,
            message:"Category created Successdfully"
        })
    } catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


//getAllCategory 
exports.showAllCategories = async (req, res) => {
    try{
        const allCategory = await Category.find({},{name:true, description:true})
        res.status(200).json({
            success:true,
            message:"All Category returned successdfully",
            data:allCategory
        })
    } catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


//categoryPageDetails 

exports.categoryPageDetails = async (req, res) => {
    try {
            //get categoryId
            const {categoryId} = req.body;
            console.log("category id",categoryId)
            //get courses for specified categoryId
            //If the categories does not have any course then db will throw error for populating course
            const selectedCategory = await Category.findById(categoryId)
                                            .populate({
                                                path: "course",
                                                match: {status: "Published"},
                                                populate: "ratingAndReviews",
                                            })
                                            .exec()

            //Handle the case when the category is not found
            //validation                        
            if(!selectedCategory) {
                return res.status(404).json({
                    success:false,
                    message:'category and their course not found Not Found',
                });
            }


            // Handle the case when there are no courses
            if( selectedCategory.course.length === 0) {
                console.log("No course founf for the selected category")
                return res.status(404).json({
                    success: false,
                    message: "No course found for the selected categories."
                })
            }

            //get coursesfor different categories
            const categoriesExpectSelected = await Category.find({
                                         _id: {$ne: categoryId},
                                         })
                                         //.populate("courses")
                                         //.exec();

            let differentCategory = await Category.findOne(
                categoriesExpectSelected[getRandomInt( categoriesExpectSelected.length)]._id
            ).populate({
                path: "course",
                match: { status: "Published"}
            }).exec()

            const allCategories = await Category.find()
                                                    .populate({
                                                        path: "course",
                                                        match: {status: "Published"},
                                                        populate: {
                                                            path: "instructor"
                                                        }
                                                    }).exec()
            
            const allCourses = allCategories.flatMap( category => category.course)
            const mostSellingCourses = allCourses
                                            .sort( (a,b) => b.sold - a.sold)
                                            .slice(0,10)

            //get top 10 selling courses
            //HW - write it on your own

            //return response
            return res.status(200).json({
                success:true,
                data: {
                    selectedCategory,
                    differentCategory,
                    mostSellingCourses
                },
            });

    }
    catch(error ) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Unable to get cateogories pages",
            error: error.message
        });
    }
}