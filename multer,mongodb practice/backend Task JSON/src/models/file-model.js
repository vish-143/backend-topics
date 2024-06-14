const mongoose = require("mongoose")
const Schema = mongoose.Schema

const FileSchema = new Schema({
    address: {
        building: { type: String },
        coord: { type: Array },
        street: { type: String },
        zipcode: { type: String }
    },
    // address: { type: Object },
    borough: { type: String },
    cuisine: { type: String },
    grades: [
        {
            date: {
                $date: { type: Object }
            },
            grade: { type: String },
            score: { type: Number }
        },
        {
            date: {
                $date: { type: Object }
            },
            grade: { type: String },
            score: { type: Number }
        },
        {
            date: {
                $date: { type: Object }
            },
            grade: { type: String },
            score: { type: Number }
        },
        {
            date: {
                $date: { type: Object }
            },
            grade: { type: String },
            score: { type: Number }
        },
        {
            date: {
                $date: { type: Object }
            },
            grade: { type: String },
            score: { type: Number }
        },
    ],
    // grades: { type: Array },
    name: { type: String },
    restaurant_id: { type: String },
    establishedYear: { type: String },
    foodItems: { type: Object },
})

const FileSystem = mongoose.model("files", FileSchema)
module.exports = FileSystem