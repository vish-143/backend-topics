const mongoose = require("mongoose");
const generator = require('generate-password')
const Schema = mongoose.Schema;

const employeeDetailsSchema = new Schema({
  _id: {
    type: String,
    distinct: true,
  },
  firstName: {
    type: String,
    required: [true, "Employee first name to be required"],
  },
  lastName: {
    type: String,
    required: [true, "Employee last name to be required"],
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  position: {
    type: String,
    required: [true, "Employee position to be required"],
  },
  joinedDate: {
    type: String,
    required: [true, "Employee joining date to be required"],
  },
  location: {
    type: String,
    required: [true, "Employee location to be required"],
  },
  git_id: {
    type: String,
  },
  linkedIn_id: {
    type: String,
  },
  skills: {
    type: [String],
  },
  interviewDetails: [{
    resource: { type: String },
    bde: { type: String },
    techStack: { type: String },
    interviewDate: { type: String },
    experience: { type: String },
    round: { type: String },
    vendor: { type: String },
    interviewer: { type: String },
    client: { type: String },
    status: { type: String },
    feedback: { type: String },
    recording: { type: String },
    time: {
      hour: { type: Number },
      minute: { type: Number }
    }
  }],
  profilePictureUrl: {
    type: String
  },
  aboutData: {
    type: String
  },
  projectData: [{
    endYear: { type: String },
    projectDescription: { type: String },
    projectName: { type: String },
    role: { type: String },
    stack: { type: String },
    startYear: { type: String },
    reportedTo:{type:String},
    ongoing:{type:String}
  }],
  educationalData: [{
    major: { type: String },
    degree: { type: String },
    endYear: { type: String },
    institute: { type: String },
    startYear: { type: String }
  }],
  employmentData:[{
    category: { type: String },
    description: { type: String },
    endYear: { type: String },
    role: { type: String },
    startYear:{ type: String }
  }],
  personalData:{
    address:{ type: String },
    branch:{ type: String },
    dob:{ type: String },
    email: { type: String },
    doj: { type: String },
    email: { type: String },
    fatherName: { type: String },
    fullName: { type: String },
    phone: { type: String },
    zipCode: { type: String },
  },
  otp: {
    type: Number
},
})

employeeDetailsSchema.pre("save", function (next) {

  const randomPassword = generator.generate({
    length: 8,
    numbers: true,
    symbols: true,
    uppercase: true,
    lowercase: true,
    strict: true
  });

  if (!this.email) {
    console.log("Email");
    this.email =
      this.firstName.toLowerCase() +
      "." +
      this.lastName[0].toLowerCase() +
      "@mitrahsoft.com";
    this.password = randomPassword;
  }
  next();
});

const employeeDetail = mongoose.model("Employee-Detail", employeeDetailsSchema);
module.exports = employeeDetail;