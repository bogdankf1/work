//Require needed modules
const fs = require('fs')
const Koa = require('koa')
const Router = require('koa-router')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')

//Create Koa application
const app = new Koa()

//Create Koa router
const router = new Router()

//Set server hostname and port 
const hostname = '127.0.0.1'
const port = 3000

//Get data from .json files
const cities = JSON.parse(fs.readFileSync('cities.json'))
const countries = JSON.parse(fs.readFileSync('countries.json'))

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

//Receive all data from the post request
const receivePostData = (async (ctx, next) => {
    let receivedData = ""
    ctx.req.on("data", chunk => { receivedData += chunk.toString() })
    ctx.postData = receivedData
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
    console.log(ctx.body)
})

//GET requests
router.get('/api/country/list', middlewareLogger, getCountriesHandler)
router.get('/api/city/list/:countryName', middlewareLogger, matchCities, getCitiesHandler)

//POST requests
router.post('/api/country', middlewareLogger, postCountriesHandler)
router.post('/api/city', middlewareLogger, postCitiesHandler)

//Use middlewares
app.use(cors())
app.use(bodyParser())
app.use(router.routes())

//Listen server
app.listen(port, () => {
    console.log(`Koa server listening on http://${hostname}:${port}`)
})