const data = require('./../data.js')
const sendResponse = require('./../actions.js')

const getCountriesHandler = ctx => {
    sendResponse.sendResponse(ctx, data.countries)
}

const postCountriesHandler = ctx => {
    sendResponse.sendResponse(ctx, ctx.request.body)
}

module.exports.getCountriesHandler = getCountriesHandler
module.exports.postCountriesHandler = postCountriesHandler