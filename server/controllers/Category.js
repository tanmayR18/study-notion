const Category = require('../model/Category')

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
exports.showAllCategory = async (req, res) => {
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
            //get courses for specified categoryId
            const selectedCategory = await Category.findById(categoryId)
                                            .populate("courses")
                                            .exec();
            //validation
            if(!selectedCategory) {
                return res.status(404).json({
                    success:false,
                    message:'Data Not Found',
                });
            }
            //get coursesfor different categories
            const differentCategories = await Category.find({
                                         _id: {$ne: categoryId},
                                         })
                                         .populate("courses")
                                         .exec();

            //get top 10 selling courses
            //HW - write it on your own

            //return response
            return res.status(200).json({
                success:true,
                data: {
                    selectedCategory,
                    differentCategories,
                },
            });

    }
    catch(error ) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}