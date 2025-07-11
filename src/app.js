const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// Define paths for Epxpress config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Martin'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help',
        message: 'Tell us what you want',
        name : 'Martin'
    })
})
app.get('/weather', (req, res) => {
    const {address} = req.query
    if(!address){
        return res.send({
            error: 'You must provide Address'
        })
    } else {
        geocode(address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                return res.send({
                    error
                })
            }
            forecast(latitude, longitude, (error, forecast) => {
                if(error){
                    return res.send({
                        error
                    })
                }
                res.send({
                    forecast,
                    location,
                    address
                })
            })
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            Error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/:article', (req,res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found.',
        name : 'Martin'
    })
})

app.use((req, res) => {
    res.status(404).render('404', {
        title: '404',
        message: 'Page not Found',
        name : 'Martin'
    });
})
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log('Server is up on port ' + port);
// });