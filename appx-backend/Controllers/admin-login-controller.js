const createErrors = require("http-errors");
const Register = require("../Models/admin-login");
const sendEmail = require("./nodeMailer");
const CustomError = require("../Utils/CustomError");
const { signAccessToken, signRefreshToken } = require("../helpers/jwt_token");
const multer = require("multer");
const path = require("path");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save uploaded files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Controller function to handle file upload
const uploadImage = async (req, res) => {
  console.log("req.file.path: ", req);
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    const personId = req.body._id;
    // Read the image file and convert it to base64
    const imageUrl = `${process.env.BASE_URL}:${process.env.PORT}/uploads/${req.file.filename}`;

    // Check if a person with the given ID already exists
    let person = await Register.findOne({ _id: personId });

    // If the person exists, update the image
    if (person) {
      person.profilePicture = imageUrl;
      await person.save();
    } else {
      // If the person doesn't exist, create a new record
      person = new Register({
        personId,
        profilePicture: imageUrl,
      });
      await person.save();
    }
    // Remove the uploaded file after saving it to MongoDB
    // fs.unlinkSync(req.file.path);
    res.status(200).json({
      data: person,
      message: "File uploaded successfully!",
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  upload,
  uploadImage,
  createAdminRegistration: (req, res, next) => {
    const register = new Register({
      email: req.body.email,
      password: req.body.password,
      forgetPassword: req.body.forgetPassword,
    });
    register
      .save()
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        if (error.name === "ValidationError") {
          next(createErrors(422, error.message));
          return;
        }
        next(error);
      });
  },

  loginAdminDetails: async (req, res) => {
    try {
      const user = await Register.findOne({
        email: req.body.email,
        password: req.body.password,
      });

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
        data: { id: user._id },
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

  getAdminDetail: async (req, res, next) => {
    try {
      const findAdminById = await Register.findById(req.params.id);
      if (!findAdminById) {
        const error = new CustomError(
          "Admin with this Id not to be found",
          404
        );
        return next(error);
      }
      res.status(200).json({
        status: "Success",
        data: {
          findAdminById,
        },
      });
    } catch (error) {
      res.status(404).json({
        status: "Fail",
        message: error.message,
      });
    }
  },

  forgetPasswordOTP: async (req, res) => {
    try {
      const forgetPassword = await sendEmail();

      if (forgetPassword === null || forgetPassword === undefined) {
        throw new Error("Email sending failed");
      }

      const result = await Register.findByIdAndUpdate(
        req.params.id,
        { forgetPassword },
        { new: true, runValidators: true }
      );
      res.status(200).json({
        status: "Success",
        data: {
          result,
        },
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
      const newData = await Register.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      console.log("newData", newData);
      res.status(200).json({
        status: "Success",
        data: {
          newData,
        },
      });
    } catch (error) {
      res.status(404).json({
        status: "Fail",
        message: error.message,
      });
    }
  },

  adminEducationalDetails: async (req, res) => {
    try {
      const details = await Register.findByIdAndUpdate(
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
  adminEmploymentDetails: async (req, res) => {
    try {
      const details = await Register.findByIdAndUpdate(
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
  adminPersonalData: async (req, res) => {
    try {
      const details = await Register.findByIdAndUpdate(
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
  forgetPassword: async (req, res) => {
    try {
      const detail = await Register.findOneAndUpdate(
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
      const detail = await Register.findOne(
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
