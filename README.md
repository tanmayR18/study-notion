
#  Study Notion

 An Ed-tech platform that provide courses ranging from basic of python to AI and blockchain . Built using MERN stack.
## Tech Stack

**Client:** 
- React.js
- Tailwind CSS
- Redux toolkit

**Server:** 
- Node.js -  Express.js
- MongoDB
- Rest API

## Demo

https://github.com/tanmayR18/study-notion/assets/135257857/1fbbac2c-94b7-4937-a3f7-1f2e724656a7

https://github.com/tanmayR18/study-notion/assets/135257857/05f45723-f764-4324-914a-add0367f5f55

https://github.com/tanmayR18/study-notion/assets/135257857/b631da07-a178-477b-b757-d567c15aa115

https://github.com/tanmayR18/study-notion/assets/135257857/31ea31c0-4864-43b0-a197-17f16415617c




## Features

- Authentication and Authorization of user
- Payment Gateway ( Razor pay )
- Responsive
- Verification of email before signUp
- Protected Routes 
- Profile updations 
- Instructor dashboard to monitor course progress
- Progress bar for courses enrolled by students
- JWT for keeping user logged In
- Encryption of password 
- Verification and acknowledge using OTP
- Validated Forms 

## Run Locally

- Clone the project in your local device 
- Open the project in your favourite code editor
- Open terminal and add the following commands  
        1. `npm i` or `npm install`  
        2. `npm run dev`  
        
- Get and add the environment variable given below
- The project will be automatically open in your default browser on the localhost:3000


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

**Frontend:**

`REACT_APP_BASE_URL` - Eg: http://localhost:4000/api/v1

`REACT_APP_RAZORPAY_KEY` - from your razorpay demo account 

**Backend:**

`MAIL_HOST` - from nodemailer

`MAIL_USER` - from nodemailer

`MAIL_PASS` - from nodemailer

`JWT_SECRET` - any word

`RAZORPAY_KEY` - from  RazorPay Account

`RAZORPAY_SECRET` -  from RazorPay Account

`CLOUD_NAME` - from cloudinary

`API_KEY` - from cloudinary

`API_SECRET` - from cloudinary

`FOLDER_NAME` - any folder name 

`DATABASE_URL` - Mongodb url

`PORT` - any port number expect 3000



## Deployment

Frontend - Vercel: https://study-notion-18.vercel.app/

Backend - Render


Note: Due to use of free tier of Backend service from render.com there is delay in the reponse for the first request from the render as the server is not running all the time.

