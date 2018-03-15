//проблема с асинхронностью - города возвращаются не в том порядке
//модули - require/module.exports vs import/export + что туда раскидать

//Require needed modules
const Koa = require('koa'),
      Router = require('koa-router'),
      cors = require('koa2-cors'),
      bodyParser = require('koa-bodyparser'),
      mongo = require('mongodb'),
      connection = require('./mongo.js'),
      data = require('./api/data.js'),
      cityActions = require('./api/city/city-actions.js'),
      countryActions = require('./api/country/country-actions.js'),
      middlewares = require('./api/middlewares.js')

//Create Koa application
const app = new Koa()

//Create Koa router
const router = new Router()

//Set server hostname and port 
const hostname = '127.0.0.1',
      port = 3001,
      dbPort = 27017,
      dbName = "myApp"

const connect = async () => {
    console.log("connect")
    const client = await mongo.connect(`mongodb://${hostname}:${dbPort}`)
    return client
}

//Fetch countries from the database
const fetchCountriesFromDB = client => {
    const db = client.db(dbName),
          collection = db.collection('countries')
    collection.find({}).toArray(async (err, result) => {
        data.countries = await result
        console.log("fetchCountries")
    })
}

//Fetch cities from the database
const fetchCitiesFromDB = async (client, countryName) => {
    const db = client.db(dbName),
          collection = db.collection('cities')
    collection.find({country:countryName}).toArray(async (err, result) => {
        data.cities = await result
        console.log("fetchCities")
    })
}

//GET requests
router.get('/api/country/list', countryActions.getCountriesHandler)
router.get('/api/city/list/:countryName', cityActions.getCitiesHandler)

//POST requests
router.post('/api/country', countryActions.postCountriesHandler)
router.post('/api/city', cityActions.postCitiesHandler)

//Use middlewares
app.use(middlewares.middlewareLogger)
app.use(cors())
app.use(bodyParser())
app.use(router.routes())

//Initialize server and make connections 
const init = async () => {
    const client = await connect()
    fetchCountriesFromDB(client)
    
    //test launch
    fetchCitiesFromDB(client, "USA")
}

//Run method
const run = async () => {
    await init()
    //Listen server
    app.listen(port, () => {
        console.log(`Koa server listening on http://${hostname}:${port}`)
    })
}

//Run server
run()
