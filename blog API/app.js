const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const connection = require("./config/dbconfig")
const employeeRoute = require("./routes/employee-route")

const app = express();

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database:', error);
  } else {
    console.log('Connected to MySQL database!');
  }
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/employee", employeeRoute)

app.get("/", (req, res) => {
  res.status(200).json({
    message: "This is home page",
  });
});

app.use((req, res, next) => {
  const err = new Error('not found');
  err.status = 404;
  next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      success: false,
      status: err.status || 500,
      message: err.message
    }
  })
})

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on Port ${process.env.APP_PORT}`);
});


module.exports=app