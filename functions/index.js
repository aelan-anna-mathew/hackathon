const express = require("express");
const serverless = require("serverless-http");
const https = require("https");
const cors = require("cors");
const app = express();
const crypto = require("crypto");
const speakeasy = require("speakeasy");
const axios = require('axios');
const bluebird = require("bluebird");

function generateTOTP(secret) {

  const token = speakeasy.totp({
    secret: secret,
    encoding: "base32",
    step: 30, // Time step in seconds (default is 30)
    digits: 10, // Number of digits in the OTP (default is 6)
  });

  return token;
}


app.use(express.json());


app.post('/',cors(), async (req, res) => {
 

    try {
      const { userid,accessToken } = req.body;
      const externalData = await axios.get(`https://aby1123.pythonanywhere.com/?userid=${userid}`,{
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
     res.json({
    tot:externalData.data
  });
  console.log(externalData.data)
}
catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
}
});


// Load SSL certificate and key
const options = {
  // key: fs.readFileSync('path/to/your/private.key'),   // Update with the path to your private key file
  // cert: fs.readFileSync('path/to/your/certificate.crt') // Update with the path to your certificate file
};

// Create HTTPS server
https.createServer(options, app);
// Start listening for HTTPS requests

// Create a handler for the serverless application using serverless-http
module.exports.handler = serverless(app);
