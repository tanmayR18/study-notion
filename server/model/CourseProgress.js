const mongoose = require('mongoose')

const courseProgress = mongoose.Schema({
    
    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    completeVideos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubSection",
        }
    ]
})


module.exports = mongoose.model("CourseProgress", courseProgress)