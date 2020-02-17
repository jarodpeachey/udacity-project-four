// Dependencies
const dotenv = require('dotenv');
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const mockAPIResponse = require('./mockAPI.js');
const aylien = require('aylien_textapi');

dotenv.config();

// Initiate server
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware, as well as cors
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Use dist folder
app.use(express.static('dist'));

// Initialize server
const port = 3000;

const server = app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

// Initiate Aylien
const api = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY,
});

// Empty data object
projectData = {
  entries: [],
};

// Get function
app.get('/', function(req, res) {
  res.sendFile('dist/index.html');
});

app.get('/get', sendData);
app.post('/api', makeApiRequest);

function sendData(request, response) {
  response.send(projectData);
}

async function makeApiRequest(request, response) {
  // fetch(process.env.API_ENDPOINT)
  const apiResponse = await api.sentiment(
    {
      url: request.body.url,
    },
    (err, res) => {
      const newEntry = {
        ...res,
        date: request.body.date,
      };

      console.log(res);

      postNewEntry(newEntry);
      response.send(newEntry);
    },
  );
}

function postNewEntry(newEntry) {
  projectData = {
    entries: [...projectData.entries, newEntry],
  };
}
