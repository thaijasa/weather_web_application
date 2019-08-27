const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/21caacf39474cf6e52b6fef5b40663e8/" + latitude + "," + longitude + "?units=si"

    request({url: url, json:true}, (error, response)=>{
        if(error){
            callback("Unable to connect to weather service!", undefined)
        } else if(response.body.error === 0){
            callback("Unable to find location, try another search!", undefined)
        }else{
            callback(undefined, response.body.daily.data[0].summary + "It is currently " + response.body.currently.temperature + " degrees out. There is a " + 
                    response.body.currently.precipProbability + "% chance of rain. The minimum temperature for today is " + response.body.daily.data[0].temperatureMin + 
                    "deg C and the maximum temperature for today is " + response.body.daily.data[0].temperatureMax + "deg C")
        }
    })
    
}

module.exports = forecast