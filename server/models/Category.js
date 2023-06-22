const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    //check wether course should be an array of courses id
    course: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
    }]
})

module.exports = mongoose.model("Category",categorySchema)
