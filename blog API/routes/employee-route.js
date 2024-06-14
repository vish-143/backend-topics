const express = require("express")
const router = express.Router()
const employeeController = require("../controllers/employee-controller")

router.post("/add", employeeController.addEmployee)
router.get("/", employeeController.getAllEmployee)
router.get("/:id", employeeController.getEmployeeById)
router.patch("/:id", employeeController.updateEmployee)
router.delete("/:id", employeeController.deleteEmployee)

module.exports = router