const Category = require('../model/Category')

//create Category

exports.createCategory = async (req,res) => {
    try{
        //fetch data 
        const {name, description} = req.body
        //validation
        if(!name || !description){
            return res.json(400).json({
                success:true,
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
            allCategory
        })
    } catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}