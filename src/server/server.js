//   TASKS/PROBLEMS
//проблема с асинхронностью - города возвращаются не в том порядке
//модули - require/module.exports vs import/export

//Require needed modules
const Koa = require('koa'),
      Router = require('koa-router'),
      cors = require('koa2-cors'),
      bodyParser = require('koa-bodyparser'),
      connection = require('./db/mongo.js'),
      data = require('./api/data.js'),
      cityActions = require('./api/city/city-actions.js'),
      countryActions = require('./api/country/country-actions.js'),
      middlewares = require('./api/middlewares.js')

//Create Koa application and router
const app = new Koa()
const router = new Router()

//Set server hostname and port 
const hostname = '127.0.0.1',
      port = 3001,
      dbPort = 27017,
      dbName = "myApp"

//GET requests
router.get('/api/country/list', countryActions.getCountriesHandler)
router.get('/api/city/list/:countryName', cityActions.getCitiesHandler)

//POST requests
router.post('/api/country', countryActions.postCountriesHandler)
router.post('/api/city', cityActions.postCitiesHandler)

//Use middlewares
app.use(cors())
app.use(bodyParser())
app.use(router.routes())
app.use(middlewares.logger)

//Server initialize method
const init = async () => {
    const client = await connection.connect()
    countryActions.fetchCountriesFromDB(client)
}

//Server run method
const run = async () => {
    await init()
    //Listen server
    app.listen(port, () => {
        console.log(`Koa server listening on http://${hostname}:${port}`)
    })
}

//Run server
run()
