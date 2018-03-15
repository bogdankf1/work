const data = require('./../data.js')
const actions = require('./../actions.js')

const dbName = "myApp"

//Handler for GET request
const getCountriesHandler = ctx => {
    actions.sendResponse(ctx, data.countries)
}

//Handler for POST request
const postCountriesHandler = ctx => {
    actions.sendResponse(ctx, ctx.request.body)
}

//Fetch countries from the database
const fetchCountriesFromDB = client => {
    const db = client.db(dbName),
          collection = db.collection('countries')
    collection.find({}).toArray(async (err, result) => {
        data.countries = await result
    })
}

module.exports.getCountriesHandler = getCountriesHandler
module.exports.postCountriesHandler = postCountriesHandler
module.exports.fetchCountriesFromDB = fetchCountriesFromDB