const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast')

// Geocoding (take city and get back long and lat)
// Address => Lat/Long => Weather


if(!process.argv[2]){
  console.log("Please provide a proper location")
  process.exit(1)
}

geocode(process.argv[2], (error, { latitude, longitude, location }) => {
  if (error){
    return console.log(error)
  }
  
  forecast(latitude, longitude, (error, forecastData) => {
    if(error){
      return console.log(error)
    }

    console.log(location)
    console.log(forecastData)
  })
})


