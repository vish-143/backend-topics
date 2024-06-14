// emailUtils.js

const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    // host: "smtp.forwardemail.net",
    // port: 465,
    // secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

// const generateRandomNumber = () => {
//     return Math.floor(100000 + Math.random() * 900000)
// };

const sendMail = (otp,email) => {
    console.log("email",email);
    const mailOptions = {
        from: {
            name: "Vishva",
            address: process.env.EMAIL,
        },
        to: email,
        subject: "Email from Node JS ✔",
        text: `Your Internal Site OTP : ${otp.toString()}`,
        contentType: "application/json"
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                console.log('Error:', error);
                reject(error);
            } else {
                console.log("Email sent successfully");
                console.log("Text in the email :", mailOptions.text);
                resolve(mailOptions.text);
            }
        });
    });
};

module.exports = sendMail;

