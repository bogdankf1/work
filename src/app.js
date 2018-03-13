//post countryName to db and receive cities only for current country
//review code to the same code
//read about "assert.equal" etc.
//different "MongoClient.Connect" to each database request

const MongoClient = require('mongodb').MongoClient,
      assert = require('assert'),
      fs = require('fs')

const cities = JSON.parse(fs.readFileSync('cities.json')),
      countries = JSON.parse(fs.readFileSync('countries.json'))

// Database Name
const hostname = '127.0.0.1',
      dbPort = 27017,
      dbName = 'myApp'

const insertCountries = (db, callback) => {
    const collection = db.collection('countries')
    collection.insertMany(countries, (err, result) => {
    //   assert.equal(err, null)
    //   assert.equal(3, result.result.n)
    //   assert.equal(3, result.ops.length)
        console.log("Inserted countries into the collection")
        callback(result)
    })
}

const insertCities = (db, callback) => {
    const collection = db.collection('cities')
    collection.insertMany(cities, (err, result) => {
        console.log("Inserted cities into the collection")
        callback(result)
    })
}

const findCountries = (db, callback) => {
    const collection = db.collection('countries')
    collection.find({}).toArray((err, result) => {
        // assert.equal(err, null)
        console.log("Found the following countries:")
        console.log(result)
        callback(result)
    })
}

const findCities = (db, callback) => {
    const collection = db.collection('cities')
    collection.find({}).toArray((err, result) => {
        // assert.equal(err, null)
        console.log("Found the following cities:")
        console.log(result)
        callback(result)
    })
}

// const updateDocument = (db, callback) => {
//     // Get the documents collection
//     const collection = db.collection('documents')
//     // Update document 
//     collection.updateOne(
//         { a : 2 }, { $set: { b : 1 } }, (err, result) => {
//         assert.equal(err, null)
//         assert.equal(1, result.result.n)
//         console.log("Updated the document")
//         callback(result)
//     })
// }

const removeAllCountries = (db, callback) => {
    const collection = db.collection('countries')
    collection.deleteMany({}, (err, result) => {
        // assert.equal(err, null)
        // assert.equal(1, result.result.n)
        console.log("All countries removed!")
        callback(result)
    }) 
}

const removeAllCities = (db, callback) => {
    const collection = db.collection('cities')
    collection.deleteMany({}, (err, result) => {
        console.log("All cities removed!")
        callback(result)
    }) 
}

MongoClient.connect(`mongodb://${hostname}:${dbPort}`, (err, client) => {
    // assert.equal(null, err)
    console.log("Connected successfully to server")
    const db = client.db(dbName)
    
    removeAllCountries(db, () => {
        removeAllCities(db, () => {
            insertCountries(db, () => {
                insertCities(db, () => {
                    client.close()
                })
            })
        })
    })
})