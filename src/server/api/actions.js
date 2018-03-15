const sendResponse = (ctx, response) => {
    ctx.body = JSON.stringify(response)
    // console.log("sendResponse")
}

module.exports.sendResponse = sendResponse