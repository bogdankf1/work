//Require needed modules
const Koa = require('koa'),
      Router = require('koa-router'),
      cors = require('koa2-cors'),
      bodyParser = require('koa-bodyparser'),
      mongo = require('mongodb')

//Create Koa application
const app = new Koa()

//Create Koa router
const router = new Router()

//Set server hostname and port 
const hostname = '127.0.0.1',
      port = 3000,
      dbPort = 27017,
      dbName = "myApp"

//Get data from .json files
let cities = [],
    countries = []

//Fetch countries from the database
const fetchCountriesFromDB = () => {
    mongo.connect(`mongodb://${hostname}:${dbPort}`, (err, client) => {
        console.log(`Connected to MongoDB on mongodb://${hostname}:${dbPort}`)
        const db = client.db(dbName),
              collection = db.collection('countries')
        collection.find({}).toArray(async(err, result) => {
            countries = await result
            client.close()
        })
    })
}

//Fetch cities from the database
const fetchCitiesFromDB = (countryName) => {
    mongo.connect(`mongodb://${hostname}:${dbPort}/${countryName}`, (err, client) => {
        console.log(`mongodb://${hostname}:${dbPort}/:${countryName}`)
        console.log(`Connected to MongoDB on mongodb://${hostname}:${dbPort}`)
        const db = client.db("myApp"),
              collection = db.collection('cities')
        collection.find({}).toArray(async (err, result) => {
            cities = await result
            client.close()
        })
    })
}

fetchCountriesFromDB()
fetchCitiesFromDB()

//MIDDLEWARES
//Logger
const middlewareLogger = (async (ctx, next) => {
    console.log(`Request: ${ctx.method} ${ctx.url}`)
    await next()
})

//Create array of cities by the requested country
const matchCities = (async (ctx, next) => {
    let response = []
    cities.forEach(item => {
        item.country === ctx.params.countryName && response.push(item)
    })
    ctx.jsonData = response
    await next()
})

//HANDLERS
const getCitiesHandler = (async ctx => {
    ctx.body = JSON.stringify(ctx.jsonData)
})

const getCountriesHandler = (async ctx => {
    ctx.body = JSON.stringify(countries)
})

const postCountriesHandler = (async ctx => {
    ctx.body = JSON.stringify(ctx.request.body)
})

const postCitiesHandler = (async ctx => {
    ctx.body = JSON.stringify(ctx.request.body)
})

//GET requests
router.get('/api/country/list', getCountriesHandler)
router.get('/api/city/list/:countryName', matchCities, getCitiesHandler)

//POST requests
router.post('/api/country', postCountriesHandler)
router.post('/api/city', postCitiesHandler)

//Use middlewares
app.use(middlewareLogger)
app.use(cors())
app.use(bodyParser())
app.use(router.routes())

//Listen server
app.listen(port, () => {
    console.log(`Koa server listening on http://${hostname}:${port}`)
})