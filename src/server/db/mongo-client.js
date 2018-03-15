//Require needed modules
const MongoClient = require('mongodb').MongoClient,
      assert = require('assert'),
      fs = require('fs')
      
//Get data from .json files
const cities = JSON.parse(fs.readFileSync('./../data/cities.json')),
      countries = JSON.parse(fs.readFileSync('./../data/countries.json'))

// Database host, port, name
const hostname = '127.0.0.1',
      dbPort = 27017,
      dbName = 'myApp'

//Add countries to database
const insertCountries = (db, callback) => {
    const collection = db.collection('countries')
    collection.insertMany(countries, (err, result) => {
        console.log("Inserted countries into the collection")
        callback(result)
    })
}

//Add cities to database
const insertCities = (db, callback) => {
    const collection = db.collection('cities')
    collection.insertMany(cities, (err, result) => {
        console.log("Inserted cities into the collection")
        callback(result)
    })
}

//Remove all countries from database
const removeAllCountries = (db, callback) => {
    const collection = db.collection('countries')
    collection.deleteMany({}, (err, result) => {
        console.log("All countries removed!")
        callback(result)
    }) 
}

//Remove all cities from database
const removeAllCities = (db, callback) => {
    const collection = db.collection('cities')
    collection.deleteMany({}, (err, result) => {
        console.log("All cities removed!")
        callback(result)
    }) 
}

//Connect to database from mongo client
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