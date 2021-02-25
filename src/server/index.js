/* Dependencies */
// Require Express to run server and routes
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Start up an instance of app
const app = express();
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("dist"));

let user_trip_data = {};

app.get("/", function (req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile(path.resolve("src/client/views/index.html"));
});

// Post Route
app.post("/trip", (req, res) => {
  const {
    departingTime,
    returningTime,
    city_name,
    country_code,
    temp,
    description,
    duration,
  } = req.body;
  const tripData = {
    departingTime,
    returningTime,
    city_name,
    country_code,
    temp,
    description,
    duration,
  };
  user_trip_data = tripData;
  res.send(user_trip_data);
});

// Setup Server
const PORT = 5000;

// designates what port the app will listen to for incoming requests
app.listen(PORT, (error) => {
  if (error) throw new Error(error);
  console.log("Server listening on port ", `${PORT}`);
});


module.exports = app