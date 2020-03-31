const request = require('request')

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZWFuZ2VsZXMiLCJhIjoiY2s4YTFxY3M3MGNlMTNscW1lM3N4Y2l6OCJ9.emputB68Bt9AqtvhrYn5BA&limit=1`
  
  request({url, json: true}, (error, response, {features:results}) => {
    if (error) {
      callback('Unable to connect to location service.', undefined)
      return
    } else if (results.length === 0) {
      callback('Unable to find location. Try another search.', undefined)
      return
    }
    
    const data = {
      placename: results[0].place_name,
      latitude : results[0].center[1],
      longitude: results[0].center[0]
    }
    callback(undefined, data)
  })
}

module.exports = geocode