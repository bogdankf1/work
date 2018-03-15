const db = null

const connect = async () => {
    if(!db) {
       
    }
    
    console.log("connectTo")
    return db
}

const getConnection = () => db

module.exports.connect = connect
module.exports.getConnection = getConnection