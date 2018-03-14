//Require needed modules
const Koa = require('koa'),
      Router = require('koa-router'),
      cors = require('koa2-cors'),
      bodyParser = require('koa-bodyparser'),
      mongo = require('mongodb')
    //   getConnection = require('./mongo.js')

//Create Koa application
const app = new Koa()

//Create Koa router
const router = new Router()

//Set server hostname and port 
const hostname = '127.0.0.1',
      port = 3001,
      dbPort = 27017,
      dbName = "myApp"

//Get data from .json files
let cities = [],
    countries = []

const connect = async () => {
    const client = await mongo.connect(`mongodb://${hostname}:${dbPort}`)
    return client
}

//Fetch countries from the database
const fetchCountriesFromDB = client => {
    const db = client.db(dbName),
          collection = db.collection('countries')
    collection.find({}).toArray(async (err, result) => {
        countries = await result
        console.log(countries)
    })
}

//Fetch cities from the database
const fetchCitiesFromDB = (client, countryName) => {
    const db = client.db(dbName),
            collection = db.collection('cities')
    collection.find({country:countryName}).toArray(async (err, result) => {
        cities = await result
        console.log(cities)
    })
}

//MIDDLEWARES
//Logger
const middlewareLogger = async (ctx, next) => {
    console.log(`Request: ${ctx.method} ${ctx.url}`)
    await next()
}

//HANDLERS
const getCitiesHandler = ctx => {
    ctx.body = JSON.stringify(cities)
}

const getCountriesHandler = ctx => {
    ctx.body = JSON.stringify(countries)
}

const postCountriesHandler = ctx => {
    ctx.body = JSON.stringify(ctx.request.body)
}

const postCitiesHandler = ctx => {
    ctx.body = JSON.stringify(ctx.request.body)
}

//GET requests
router.get('/api/country/list', getCountriesHandler)
router.get('/api/city/list/:countryName', getCitiesHandler)

//POST requests
router.post('/api/country', postCountriesHandler)
router.post('/api/city', postCitiesHandler)

//Use middlewares
app.use(middlewareLogger)
app.use(cors())
app.use(bodyParser())
app.use(router.routes())

//Init server and make connections 
const init = async () => {
    const client = await connect()
    fetchCountriesFromDB(client)
}

//Run server
const run = async () => {
    await init()
    //Listen server
    app.listen(port, () => {
        console.log(`Koa server listening on http://${hostname}:${port}`)
    })
}

//Run server
run()
