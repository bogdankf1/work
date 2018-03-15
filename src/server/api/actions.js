const sendResponse = (ctx, response) => {
    ctx.body = JSON.stringify(response)
}

module.exports.sendResponse = sendResponse