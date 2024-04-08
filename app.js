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

app.use(errorConverter)
app.use(errorHandler)
module.exports = app