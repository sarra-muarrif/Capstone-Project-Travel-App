
// Require Express to run server and routes
const express = require('express')

// Start up an instance of app
const app = express()

/* Dependencies */
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
// const mockAPIResponse = require('./mockAPI.js')

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Cors for cross origin allowance
app.use(cors())

// Initialize the main project folder
app.use(express.static('dist'))

let user_trip_data = {}

app.get('/', function (req, res) {

  res.sendFile(path.resolve('src/client/views/index.html'))
})

// Post Route
app.post('/trip', (req, res) => {
  const tripData = {
    departingTime: req.body.departingTime,
    returingTime: req.body.returingTime,
    city_name: req.body.city_name,
    country_code: req.body.country_code,
    temp: req.body.temp,
    description: req.body.description,
    duration: req.body.duration
  };
  user_trip_data = (tripData)
  res.send(user_trip_data)
  console.log(user_trip_data, "user_trip_data")
})


// Setup Server
const port = 5000;

// designates what port the app will listen to for incoming requests
app.listen(port, (error) => {
  if (error) throw new Error(error)
  console.log('Server listening on port ', `${port}`)
})