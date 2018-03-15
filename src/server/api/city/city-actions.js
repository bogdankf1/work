const data = require('./../data.js')
const sendResponse = require('./../actions.js')

const getCitiesHandler = async ctx => {
    // const client = await connect()
    // fetchCitiesFromDB(client, ctx.params.countryName)
    sendResponse.sendResponse(ctx, data.cities)
}

const postCitiesHandler = ctx => {
    sendResponse.sendResponse(ctx, ctx.request.body)
}

module.exports.getCitiesHandler = getCitiesHandler
module.exports.postCitiesHandler = postCitiesHandler