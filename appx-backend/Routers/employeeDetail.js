const express = require("express")
const router = express.Router()
const employeeDetailController = require("../Controllers/employee-detail-controller")

router.post("/addEmployee", employeeDetailController.createEmployeeDetail)
router.post("/login", employeeDetailController.loginEmployeeDetails)
router.post("/upload", employeeDetailController.upload.single('file'), employeeDetailController.uploadImage);
router.get("/getEmployee", employeeDetailController.getEmployeeDetails)
router.get("/getEmployee/:id", employeeDetailController.getEmployeeDetail)
router.get('/verification',employeeDetailController.otpVerification)
router.patch("/resetPassword/:id",employeeDetailController.resetPassword)
router.patch("/editEmployee/:id", employeeDetailController.updateEmployeeDetails)
router.patch("/addInterviewDetails/:id", employeeDetailController.createInterviewDetails)
router.patch("/projectDetails/:id", employeeDetailController.employeeProjectDetails)
router.patch("/educationalDetails/:id", employeeDetailController.employeeEducationalDetails)
router.patch("/employmentDetails/:id", employeeDetailController.employeeEmploymentDetails)
router.patch("/personalDetails/:id", employeeDetailController.employeePersonalData)
router.patch("/editInterviewDetails/:id_1/:id_2",employeeDetailController.editInterviewDetail)
router.patch('/forgetPassword',employeeDetailController.forgetPassword)
router.delete("/deleteEmployee/:id", employeeDetailController.deleteEmployeeDetails)
router.delete("/deleteInterviewDetail/:id_1/:id_2", employeeDetailController.deleteInterviewDetail)

module.exports = router