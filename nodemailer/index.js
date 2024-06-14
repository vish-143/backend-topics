const nodemailer = require("nodemailer");
require("dotenv").config();
const path = require("path");
const otpGenerator = require('otp-generator')

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.forwardemail.net",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});


const mailOptions = {
  from: {
    name: "Secret Santa",
    address: process.env.EMAIL,
  },
  to: "chweetyvishwa143@gmail.com",
  subject: "Here is your Secret Santa🎅✔",
  // text:Math.floor(100000 + Math.random() * 900000).toString(),
  // text: otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false }),
  // contentType:"text/plain"
  html: "<h1>Turn on the light in your room and put a message in CBE juniors and seniors as below attachment dialogue.</h1>",
  attachments:[
    // {
    //   filename:"JSON-3.pdf",
    //   path:path.join(__dirname,"JSON-3.pdf"),
    //   contentType:"application/pdf"
    // },
    {
      filename:"vishva.jpg",
      path:path.join(__dirname,"vishva.jpg"),
      contentType:"image/jpg"
    }
  ]
};

const sendMail = async (transporter, mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.log('Error:', error);
  }
};

async function sendEmail() {
  await sendMail(transporter, mailOptions);
}

sendEmail();



