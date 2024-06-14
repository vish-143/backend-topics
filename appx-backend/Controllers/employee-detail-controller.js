const EmployeeDetail = require("../Models/employee-details");
const CustomError = require("../Utils/CustomError");
const { signAccessToken, signRefreshToken } = require("../helpers/jwt_token");
const multer = require('multer');
const path = require('path');
const sendEmail = require("./nodeMailer");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save uploaded files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Controller function to handle file upload
const uploadImage = async (req, res) => {
  console.log('req.file.path: ', req);
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    const personId = req.body._id;
    // Read the image file and convert it to base64
    const imageUrl = `${process.env.BASE_URL}:${process.env.PORT}/uploads/${req.file.filename}`

    // Check if a person with the given ID already exists
    let person = await EmployeeDetail.findOne({ _id: personId });

    // If the person exists, update the image
    if (person) {
      person.profilePictureUrl = imageUrl;
      await person.save();
    } else {
      // If the person doesn't exist, create a new record
      person = new EmployeeDetail({
        personId,
        profilePictureUrl: imageUrl,
      });
      await person.save();
    }
    // Remove the uploaded file after saving it to MongoDB
    // fs.unlinkSync(req.file.path);
    res.status(200).json({
      data: person,
      message: 'File uploaded successfully!'
    })
  } catch (error) {

    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  upload,
  uploadImage,
  createEmployeeDetail: async (req, res) => {
    try {
      const Detail = await EmployeeDetail.create(req.body);
      if (!Detail) {
        const error = new CustomError("All required fields are mandatory", 400);
        return next(error);
      }

      res.status(200).json({
        status: "Success",
        data: {
          Detail,
        },
        message: "User added successfully",
      });
    } catch (error) {
      res.status(400).json({
        status: "Fail",
        message: error.message,
      });
    }
  },

  getEmployeeDetails: async (req, res) => {
    try {
      const Detail = await EmployeeDetail.find();
      if (!Detail) {
        const error = new CustomError("Employee details not to be found", 404);
        return next(error);
      }
      res.status(200).json({
        status: "Success",
        data: Detail,
      });
    } catch (error) {
      res.status(404).json({
        status: "Fail",
        message: error.message,
      });
    }
  },

  getEmployeeDetail: async (req, res, next) => {
    try {
      const findEmployeeById = await EmployeeDetail.findById(req.params.id);
      if (!findEmployeeById) {
        const error = new CustomError(
          "Employee with this Id not to be found",
          404
        );
        return next(error);
      }
      res.status(200).json({
        status: "Success",
        data: {
          findEmployeeById,
        },
      });
    } catch (error) {
      res.status(404).json({
        status: "Fail",
        message: error.message,
      });
    }
  },

  updateEmployeeDetails: async (req, res) => {
    try {
      const Detail = await EmployeeDetail.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      res.status(200).json({
        status: "Success",
        data: Detail,
      });
    } catch (error) {
      res.status(404).json({
        status: "Fail",
        message: error.message,
      });
    }
  },

  deleteEmployeeDetails: async (req, res) => {
    try {
      await EmployeeDetail.findByIdAndDelete(req.params.id);
      res.status(204).json({
        data: null,
      });
    } catch (error) {
      res.status(404).json({
        status: "Fail",
        message: error.message,
      });
    }
  },

  loginEmployeeDetails: async (req, res) => {
    try {
      console.log(req.body)

      const user = await EmployeeDetail.findOne({
        email: req.body.email,
        password: req.body.password,
      });
      console.log('user: ', user);
      if (!user) {
        return res.status(404).json({
          message: "Not a registered User.",
          data: {},
        });
      }
      const accessToken = await signAccessToken(user.id);
      const refreshToken = await signRefreshToken(user.id);
      return res.status(200).json({
        message: "Login successful",
        data: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName
        },
        accessToken,
        refreshToken,
      });
    } catch (error) {
      res.status(404).json({
        status: "Fail",
        message: error.message,
      });
    }
  },

  createInterviewDetails: async (req, res) => {
    try {
      const details = await EmployeeDetail.findByIdAndUpdate(
        req.params.id,
        { $push: { interviewDetails: req.body } },
        { new: true, runValidators: true }
      );
      console.log('details: ', details)
      res.status(200).json({
        status: "Success",
        data: details,
      });
    } catch (error) {
      res.status(404).json({
        status: "Fail",
        message: error.message,
      });
    }
  },

  employeeEducationalDetails: async (req, res) => {
    try {
      const details = await EmployeeDetail.findByIdAndUpdate(
        req.params.id,
        { $push: { educationalData: req.body } },
        { new: true, runValidators: true }
      );
      res.status(200).json({
        status: "Success",
        data: details,
      });
    } catch (error) {
      res.status(404).json({
        status: "Fail",
        message: error.message,
      });
    }
  },

  employeeEmploymentDetails: async (req, res) => {
    try {
      const details = await EmployeeDetail.findByIdAndUpdate(
        req.params.id,
        { $push: { employmentData: req.body } },
        { new: true, runValidators: true }
      );
      res.status(200).json({
        status: "Success",
        data: details,
      });
    } catch (error) {
      res.status(404).json({
        status: "Fail",
        message: error.message,
      });
    }
  },

  employeePersonalData: async (req, res) => {
    try {
      const details = await EmployeeDetail.findByIdAndUpdate(
        req.params.id,
        { personalData: req.body },
        { new: true, runValidators: true }
      );
      res.status(200).json({
        status: "Success",
        data: details,
      });
    } catch (error) {
      res.status(404).json({
        status: "Fail",
        message: error.message,
      });
    }
  },

  employeeProjectDetails: async (req, res) => {
    try {
      const details = await EmployeeDetail.findByIdAndUpdate(
        req.params.id,
        { $push: { projectData: req.body } },
        { new: true, runValidators: true }
      );
      res.status(200).json({
        status: "Success",
        data: details,
      });
    } catch (error) {
      res.status(404).json({
        status: "Fail",
        message: error.message,
      });
    }
  },

  deleteInterviewDetail: async (req, res) => {
    try {
      const details = await EmployeeDetail.findByIdAndUpdate(
        req.params.id_1,
        { $pull: { interviewDetails: { _id: req.params.id_2 } } },
        { new: true }
      );
      res.status(200).json({
        data: details,
        message: "Interview detail deleted successfully",
      });
    } catch (error) {
      res.status(404).json({
        status: "Fail",
        message: error.message,
      });
    }
  },

  editInterviewDetail: async (req, res) => {
    try {
      const employeeDetailId = req.params.id_1; 
      const interviewDetailId = req.params.id_2; 
      const updatedFields = req.body;
  
      let updateObject = {};
      
      for (let key in updatedFields) {
        updateObject[`interviewDetails.$.${key}`] = updatedFields[key];
      }
  
      const details = await EmployeeDetail.findOneAndUpdate(
        { _id: employeeDetailId, "interviewDetails._id": interviewDetailId },
        { $set: updateObject },
        { new: true }
      );
  
      res.status(200).json({
        data: details.interviewDetails,
        message: "Interview detail updated successfully",
      });
    } catch (error) {
      res.status(404).json({
        status: "Fail",
        message: error.message,
      });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const newData = await EmployeeDetail.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      console.log("newData",newData);
      if(!newData){
        res.status(404).json({
          status: "Fail",
          message: "Id is invalid",
        });
      }
      else{
      res.status(200).json({
        status: "Success",
        data: {
          newData,
        },
      });
    }
    } catch (error) {
      res.status(404).json({
        status: "Fail",
        message: error.message,
      });
    }
  },
  forgetPassword:async(req,res)=>{
    try {
      const detail = await EmployeeDetail.findOneAndUpdate(
        { email: req.body.email },
        { otp: 100000 + Math.floor(Math.random() * 900000) },
        { new: true, runValidators: true }
      );
      if (!detail) {
        res.status(404).json({
          status: "Fail",
          message: "Email is invalid",
        });
      } else {
        await sendEmail(detail.otp,req.body.email);
        res.status(200).json({
          status: "Success",
          data: detail,
        });
      }
    } catch (error) {
      res.status(404).json({
        status: "Fail",
        message: error.message,
      });
    }
  },
  otpVerification: async (req, res) => {
    try {
      const detail = await EmployeeDetail.findOne(
        {otp:req.body.otp},
        );
        if(!detail){
          res.status(404).json({
            status:"Fail",
            message:"Otp is invalid"
          })
        }
        else{
          res.status(200).json({
            status:"Success",
            data:detail._id
          })
        }
    } catch (error) {
      res.status(404).json({
        status: "Fail",
        message: error.message,
      });
    }
  },
};
