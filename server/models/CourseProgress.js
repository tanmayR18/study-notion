const mongoose = require('mongoose')

const courseProgress = mongoose.Schema({
    
    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    completeVideos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubSection",
        }
    ]
})


module.exports = mongoose.model("CourseProgress", courseProgress)