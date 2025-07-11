const postRequest = require('postman-request')

const geocode = (address, callback) => {
  const apiKey = '3a2e42200fcd41a993ed2f6518c5851b';
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

  postRequest({url, json: true}, (error, {body} = {}) => {
    if (error) {
      callback('Unable to connect to location service!', undefined)
    } else if (!body.results || body.results.length === 0) {
      callback('Unable to find location', undefined)
    } else {
      const coordination = body.results[0]
      callback(undefined, {
          latitude: coordination.geometry.lat,
          longitude: coordination.geometry.lng,
          location: coordination.formatted
      })
    }
  })
}

module.exports = geocode