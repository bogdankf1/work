//MIDDLEWARES
//Logger
const middlewareLogger = async (ctx, next) => {
    console.log(`Request: ${ctx.method} ${ctx.url}`)
    await next()
}

module.exports.middlewareLogger = middlewareLogger