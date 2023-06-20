const Tag = require('../model/Tags')

//create Tags

exports.createTag = async (req,res) => {
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
        const tagDetails = await Tag.create({
            name:name,
            description:description
        })
        console.log(tagDetails)

        return res.status(200).json({
            success:true,
            message:"Tag created Successdfully"
        })
    } catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


//getAlltags 
exports.showAllTags = async (req, res) => {
    try{
        const allTags = await Tag.find({},{name:true, description:true})
        res.status(200).json({
            success:true,
            message:"All tags returned successdfully",
            allTags
        })
    } catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}