const express = require("express")
const employeeDetailRoute = require("./Routers/employeeDetail")
const createEventRoute = require("./Routers/createEvent")
const adminLoginRoute = require("./Routers/adminLogin")
const globalErrorHandler = require("./Controllers/error-controller")
const path = require('path');
const fs = require('fs');
const cors = require("cors")         

const app = express()

app.use(express.json())

app.use(express.static("./public"))

app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.use("/admin", adminLoginRoute)

app.use("/user/createEvent", createEventRoute)

app.use("/user", employeeDetailRoute)

// Create the 'uploads' directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

app.use('/uploads', express.static('uploads'));


app.get("/", (req, res) => {
    res.status(200).json({
        message: "This is home page"
    })
})
app.use(globalErrorHandler)

module.exports = app
