const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// Define parth for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebarsbars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup statis directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jose Cerón'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Jose Luis'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        message: 'What can I help you',
        title: 'Help',
        name: 'Jose Cerón'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Your must provide an Address!'
        })
    }

    geocode(req.query.address, (error,{latitude, longitude, location} = {}) => {
        if (error){
            return res.send({ error })
        }
        console.log(res)
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })
    })


    // res.send({
    //     forecast: 'It is raining',
    //     location: 'Lima',
    //     address: req.query.address
       
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    req.query
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Jose Cerón',
        errorMessage: 'Help article not found'
    })
})

// This metod needs to be last
app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Jose Cerón',
        errorMessage: 'Page not found.'
    })
})

//for initialize the server, must be call just once
app.listen(3000, () =>{
    console.log('Server is up on port 3000.')
})