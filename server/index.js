const express = require('express')
const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 4000;

const userRoutes = require('./routes/User')
const profileRoutes = require('./routes/Profile')
const paymentRoutes = require('./routes/Payment')
const courseRoutes = require('./routes/Course')

const database = require('./config/database')
const cookieParser = require('cookie-parser')
//for making backedn and frontend communicate 
const cors = require('cors')
const {cloudinaryConnect} = require('./config/cloudinary')
const fileUpload = require('express-fileupload')



//database connect
database.connect(); 
// //middleware
app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        origin:"*",
        credentials:true
    })
) 

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)

//cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth",userRoutes)
app.use("/api/v1/profile",profileRoutes)
app.use("/api/v1/course",courseRoutes)
app.use("/api/v1/payment",paymentRoutes)

//default 
app.get('/',(req, res) => {
    // return res.json({ 
    //     success:true,
    //     messgae:"Your server is up and running"
    // })
    res.send("<h1>Ye buddy light weight</h1>") 
})

app.listen(PORT,()=>{
    console.log(`Your server is running on ${PORT}`)
})