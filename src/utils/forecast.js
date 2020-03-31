const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/37042c9925a2e283877cae3737b86e86/${latitude},${longitude}?units=si`
  
  request({url, json: true}, function (error, response, {error:resError, timezone, currently, daily}) {
    if (error) {
      callback('Unable to connect to weather service.', undefined)
      return
    } else if (resError) {
      callback(`Unable to find location. ${resError}`, undefined)
      return
    }
    
    const todaySumary = daily.data[0].summary
    const data = `(${timezone}) ${todaySumary}\nIt is currently ${currently.temperature} degrees out.\nThere is a ${currently.precipProbability}% change to rain.`
    
    callback(undefined, data)
  })
}

module.exports = forecast