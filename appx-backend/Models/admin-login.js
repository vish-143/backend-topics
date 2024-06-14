const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdminRegisterSchema = new Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    otp: {
        type: Number
    },
    profilePicture: { type: String },
    educationalData: [{
        major: { type: String },
        degree: { type: String },
        endYear: { type: String },
        institute: { type: String },
        startYear: { type: String }
    }],
    employmentData: [{
        description: { type: String },
        endYear: { type: String },
        role: { type: String },
        startYear: { type: String }
    }],
    personalData: {
        address: { type: String },
        email: { type: String },
        fatherName: { type: String },
        fullName: { type: String },
        phone: { type: String },
        city: { type: String },
        position: { type: String },
        bio: { type: String },
    }
})

const AdminRegister = mongoose.model('adminRegisterDetails', AdminRegisterSchema)
module.exports = AdminRegister