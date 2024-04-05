const express = require('express');
const http = require('http');
const app = require('./app.js');
const mongoose = require('mongoose');

const server = http.createServer(app);

let dbUrl = "mongodb://127.0.0.1:27017/mean_assesment"
console.log(dbUrl, "mongodb url");
const PORT = process.env.PORT || 3000;

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((data) => {
    
    console.log("mongoose connected");
    server.listen(PORT, () => {
      console.log(`Listening to port ${PORT}`);
    });
}).catch(error => console.log(error));
