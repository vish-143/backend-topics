const mongoose = require('mongoose')
const Schema = mongoose.Schema
const createEventSchema = new Schema(
    {
        title: {
            type: "String",
            required: true
        },
        participant: {
            type: "String",
            required: true
        },
        startDate: {
            type: "String",
            required: true
        },
        endDate: {
            type: "String",
            required: true
        },
        time: {
            type: "String",
            required: true
        },
        description: {
            type: "String",
            required: true
        }
    }
)
const createEvent = mongoose.model("userEvents", createEventSchema)
module.exports = createEvent