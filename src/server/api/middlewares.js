//Logger for all requests
const logger = async (ctx, next) => {
    console.log(`Request: ${ctx.method} ${ctx.url}`)
    await next()
}

module.exports.logger = logger