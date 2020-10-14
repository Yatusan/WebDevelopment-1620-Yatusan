const express = require("express"); // import
const cors = require("cors"); // import cors
const monk = require("monk");
const timeAgo = require("node-time-ago");
const app = express(); // creating an express app
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: true}))

app.use(express.json()); //enable server to read json data coming in post requests
app.use(cors()); // enabling cors to allow requests to come inside the server

const db = monk("localhost/yatusandb"); // db to connect
const dbfeatures = db.get("features"); // from db get me the collection (table) called 'features'

//...................................




app.post('/send-email', function (req, res) {
  let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          // should be replaced with real sender's account
          user: 'pk324300@gmail.com',
          pass: 'pravinkraja'
      }
  });
  let mailOptions = {
      // should be replaced with real recipient's account
      to: req.body.email,
      subject: 'Get in Touch - AMDT',
      body: req.body.message
  };
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
  });
  res.writeHead(301, { Location: 'sign-up.html' });
  res.end();
});

let server = app.listen(8085, function(){
    let port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});


app.get("/features", async function(req, res) {
  var allFeaturesInDb = await dbfeatures.find();
  allFeaturesInDb.every(f => (f.time = timeAgo(f.time)));
  res.send(allFeaturesInDb);
});

app.post("/features", async function(req, res) {
  var newFeatureToAdd = {
    body: req.body.feature,
    author: req.body.name,
    age: req.body.age,
    time: Date.now()
  };
  await dbfeatures.insert(newFeatureToAdd);
  res.send("Successful");
});

app.listen(5000, function()  {
  console.log("Application is running on Port 5000");
});
