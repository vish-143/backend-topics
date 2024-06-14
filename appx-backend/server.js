const dotenv = require("dotenv")
dotenv.config()
const mongoose = require("mongoose")
const app = require("./app")
mongoose.connect(process.env.CONNECTION_STRING,{family:4}).then((conn) => {
    console.log("DB connected");
})
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log("Server has been started");
})