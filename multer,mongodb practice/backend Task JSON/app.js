const dotenv = require("dotenv")
dotenv.config()
const cors=require("cors")
const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require("mongoose")
const app = express();
const Port = process.env.PORT
const fileRoute = require("./src/routers/file-route")
const uploadsDir = path.join(__dirname, 'uploads');

mongoose.connect(process.env.CONNECTION_STRING,{family:4}).then(() => {
    console.log("DB connected");
})

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/upload-json", fileRoute)

app.use(express.static("./public"))

app.use('/uploads', express.static('uploads'));

// app.use((err, req, res, next) => {
//     if (err instanceof multer.MulterError) {
//         // Multer error occurred (e.g., file too large)
//         res.status(400).json({ message: err.message });
//     } else {
//         // Other errors
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

app.listen(Port, () => {
    console.log(`Server connected to ${Port}`)
})

module.exports = app