const express = require('express')
const app = express();
const cors = require('cors');
// const router = require('./src/routes');
const routes = require("./src/routes");
const { errorHandler, errorConverter } = require('./src/middleware/error');

var corsOptions = {
    origin: "*"
  };
  
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
app.use("/v1", routes);

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// app.use((err, req, res, next) => {
  
//   console.error(err.stack); // Log the error for debugging

//   let statusCode = 500;
//   let message = 'Internal Server Error';

//   if (err.name === 'ValidationError') {
//     statusCode = 400;
//     message = 'Validation error: ' + Object.values(err.errors).map(error => error.message).join(', ');
//   } else if (err.name === 'CustomError') {
//     statusCode = err.statusCode; // Use custom error status code
//     message = err.message;
//   }

//   res.status(statusCode).json({ message: err.message });
// });

app.use(errorConverter)
app.use(errorHandler)
module.exports = app