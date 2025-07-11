const postRequest = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    console.log('Inside forecast → latitude:', latitude, 'longitude:', longitude);
        const url = `https://api.weatherstack.com/current?access_key=51dc9d27611f31adc0f92e150d0aadc9&query=${latitude},${longitude}&units=m`

        postRequest({url, json: true}, (error, {body} = {}) => {            
            const {error: errorBody, current, localtime} = body
            if (error) {
                callback('Unable to connect to weather service!', undefined)
            } else if (errorBody) {
                callback('Unable to find location', undefined)
            } else {
                callback(undefined, `${current.weather_descriptions[0]}. It is currently ${current.temperature} degress out. It feels like ${current.feelslike} degress out. and Time is ${localtime}`)
            }
        })
}

module.exports = forecast

