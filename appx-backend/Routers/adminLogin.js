const express = require("express")
const router = express.Router()

const AdminLoginDetailsController = require("../Controllers/admin-login-controller")

router.post("/upload", AdminLoginDetailsController.upload.single('file'), AdminLoginDetailsController.uploadImage);
router.post("/", AdminLoginDetailsController.createAdminRegistration)
router.post("/login", AdminLoginDetailsController.loginAdminDetails)
router.get("/getAdminDetail/:id", AdminLoginDetailsController.getAdminDetail)
// router.patch("/login/:id",AdminLoginDetailsController.forgetPasswordOTP)
router.patch("/resetPassword/:id",AdminLoginDetailsController.resetPassword)
router.patch("/adminEmploymentDetails/:id",AdminLoginDetailsController.adminEmploymentDetails)
router.patch("/adminEducationDetails/:id",AdminLoginDetailsController.adminEducationalDetails)
router.patch("/adminPersonalDetails/:id",AdminLoginDetailsController.adminPersonalData)
router.patch('/forgetPassword',AdminLoginDetailsController.forgetPassword)
router.get('/verification',AdminLoginDetailsController.otpVerification)

module.exports = router