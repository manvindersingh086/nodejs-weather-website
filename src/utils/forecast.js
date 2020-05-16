const request = require("request")

const forecast = (longitude,latitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2a1fc1e7a1f8460bdaff3856aa60fc81&query='+latitude+','+longitude
    console.log(url)
    request({url:url,json:true},(error,response)=>{
        if(error)
        {
            callback('Unable to serve request',undefined)
        }
        else if(error)
        {
            callback('Unable to serve request',undefined)
        }
        else
        {   
            console.log( response.body.current.weather_descriptions[0]) 
            callback(undefined,{
                'Temperature': response.body.current.temperature,
                'feelslike' : response.body.current.feelslike,
                'weatherDescription' : response.body.current.weather_descriptions
            })
        }
    })
}

module.exports=forecast