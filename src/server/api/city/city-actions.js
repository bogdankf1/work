const data = require('./../data.js'),
      actions = require('./../actions.js'),
      connection = require('./../../db/mongo.js')

const dbName = "myApp"

//Handler for GET request
const getCitiesHandler = async ctx => {
    const client = await connection.connect()
    await fetchCitiesFromDB(client, ctx.params.countryName)
    actions.sendResponse(ctx, data.cities)
}

//Handler for POST request
const postCitiesHandler = ctx => {
    actions.sendResponse(ctx, ctx.request.body)
}

//Fetch cities from the database
const fetchCitiesFromDB = async (client, countryName) => {
    const db = client.db(dbName),
          collection = db.collection('cities')
    collection.find({country:countryName}).toArray(async (err, result) => {
        data.cities = await result
    })
}

module.exports.getCitiesHandler = getCitiesHandler
module.exports.postCitiesHandler = postCitiesHandler
module.exports.fetchCitiesFromDB = fetchCitiesFromDB