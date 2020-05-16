const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000
//Path configurations
const publicDirectoryPath = path.join(__dirname,'../public')
app.set('views', path.join(__dirname, '../templates/views'))
const partialsPath = path.join(__dirname,'../templates/partials')

//setup of handlers
app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

app.get('',(req,resp) => {
    resp.render('index',{
        title: 'Weather',
        Name : 'Manvinder Singh',
        creatorName:'Manvinder Singh'
    })
})

app.get('/about',(req,resp) => {
    resp.render('about',{
        title: 'Information about Weather',
        Name : 'Manvinder Singh',
        creatorName:'John'
    })
})

app.get('/help',(req,resp) => {
    resp.render('about',{
        title: 'Help',
        Name : 'Manvinder Singh',
        creatorName:'Kelly'
    })
})

app.get('/Weather',(req,resp) => {

    if(!req.query.address)
    {
        return resp.send({
            error:'Please provide the address'
        })
    }

    geocode(req.query.address,(error,data) => {
        if(error)
        {
            return resp.send(error)
        }
        forecast(data.longitude,data.latitude,(error,data) => {
            if(error)
            {
                return resp.send(error)
            }
            console.log(data.weatherDescription[0])
            resp.send([
                {
                    Temperature:data.Temperature
                },
                {
                    FeelsLike:data.feelslike
                },
                {
                    weatherDescription:data.weatherDescription[0]
                }
            ]
            )
        })
    })
})

app.get('/help/*',(req,resp)=> {
    resp.render('404',{
        title: 'Error Page',
        creatorName : 'Manvinder Singh',
        errorMsg:'Help article not found.'
    })
})

app.get('*',(req,resp)=> {
    resp.render('404',{
        title: 'Error Page',
        creatorName : 'Manvinder Singh',
        errorMsg:'Page not found'
    })
})
app.listen(port, () => {
    console.log('Server is up on 3000.')
})