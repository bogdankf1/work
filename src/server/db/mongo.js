const mongo = require('mongodb')

const db = null
const hostname = '127.0.0.1',
      dbPort = 27017

//Make connection with database
const connect = async () => {
    const client = await mongo.connect(`mongodb://${hostname}:${dbPort}`)
    return client
}

const getConnection = () => db

module.exports.connect = connect
module.exports.getConnection = getConnection