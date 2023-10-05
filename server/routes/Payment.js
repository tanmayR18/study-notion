//import the required modules
const express = require('express')
const router = express.Router()

const {capturePayment, verifyPayment, sendPayemntSuccessEmail} = require('../controllers/Payment')
const {auth, isInstructor, isStudent, isAdmin} = require('../middlewares/auth')

router.post("/capturePayment",auth,isStudent,capturePayment)
router.post("/verifyPayment", auth, isStudent,verifyPayment)
router.post("/sendPaymemtSuccessEmail", auth, isStudent, sendPayemntSuccessEmail)

module.exports = router