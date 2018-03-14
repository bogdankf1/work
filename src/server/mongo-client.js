//Require needed modules
const MongoClient = require('mongodb').MongoClient,
      assert = require('assert'),
      fs = require('fs')
//Get data from .json files
const cities = JSON.parse(fs.readFileSync('data/cities.json')),
      countries = JSON.parse(fs.readFileSync('data/countries.json'))

// Database host, port, name
const hostname = '127.0.0.1',
      dbPort = 27017,
      dbName = 'myApp'

const insertCountries = (db, callback) => {
    const collection = db.collection('countries')
    collection.insertMany(countries, (err, result) => {
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

const removeAllCountries = (db, callback) => {
    const collection = db.collection('countries')
    collection.deleteMany({}, (err, result) => {
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