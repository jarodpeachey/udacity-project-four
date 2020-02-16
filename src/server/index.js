// Environment variables
const dotenv = require('dotenv');
dotenv.config();

var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
const aylien = require('aylien_textapi');

// Initiate server
const app = express();

// Use dist folder
app.use(express.static('dist'));

// designates what port the app will listen to for incoming requests
app.listen(8080, function() {
  console.log('Example app listening on port 8080!');
});

// Initiate Aylien
const textApi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY,
});

// Get function
app.get('/', function(req, res) {
  res.sendFile('dist/index.html');
});

// Another get function
app.get('/test', function(req, res) {
  res.send(mockAPIResponse);
});
