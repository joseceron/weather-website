const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/eae24c6ec598f25e5df6f7a4951129a4/'+ latitude + ',' + longitude 
    request({ url, json: true }, (error, { body })=>{
        if (error){
            callback('Unable to connect to location services!', undefined)
        }else if (body.error){
            console.log('Unable to find location', undefined)
        }else {
            console.log(body.daily.data[0])
            callback('', {
                temperature: body.daily.data[0].summary + ' It is currently: ' + body.currently.temperature + '  degress out. This high today is ' + body.daily.data[0].temperatureHigh 
                
            })
        }

    })
}

module.exports = forecast