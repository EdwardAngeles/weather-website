const     path = require('path')
const  express = require('express')
const      hbs = require('hbs')
const  geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// defining path for express configuration
const   publicPath = path.join(__dirname, '../public')
const    viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setting up handlebars engine and views' location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
const layout = '../layouts/default'

// setting up static dir to serve
app.use(express.static(publicPath))

// settinp up address resonposes
app.get('/', (req, res) => {
  res.render('index', {layout, title: 'Weather App', name: 'Edward Angeles'});
})

app.get('/about', (req, res) => {
  res.render('about', {layout, title: 'About Me', name: 'Edward Angeles'})
})

app.get('/help', (req, res) => {
  res.render('help', {layout, title: 'Help', name:'Edward', message: 'This is the help page.'})
})

app.get('/help/*', (req, res) => {
  res.render('error', {layout, title: '404 Help', name:'Edward Angeles', message: 'Help not found.'})
})

app.get('/weather', (req, res) => {
  if (!req.query.address) return res.send({error: 'An address must be provided.'})
  
  geocode(req.query.address, (error, {placename, latitude, longitude} = {}) => {
    if(error) return res.send({error})
    
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) return res.send(error)
      
      res.send({placename, latitude, longitude, forecastData})
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) return res.send({error: 'You must provide a search term.'})
  
  console.log(req.query)
  
  res.send({
    products: []
  })
})

app.get('*', (req, res) => {
  res.render('error', {layout, title: '404 Page not found.', name: 'Edward Angeles', message: 'Page not found.'})
})

// starting the serve
app.listen(3000, () => {console.log('Server is up on port 3000.')})