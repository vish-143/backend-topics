const express = require("express")
const router = express.Router()
const eventDetailsController = require("../Controllers/create-event-controller")

router.post("/", eventDetailsController.createEventRegistration)
router.get("/", eventDetailsController.geteventDetails)

module.exports = router