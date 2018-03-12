//Require needed modules
const http = require('http')
const fs = require('fs')
const express = require('express')

//Create express application
const app = express()

//Set server hostname and port 
const hostname = '127.0.0.1'
const port = 3000

//Get data from .json files
const cities = JSON.parse(fs.readFileSync('cities.json'))
const countries = JSON.parse(fs.readFileSync('countries.json'))

//MIDDLEWARES
//Logger
const middlewareLogger = (req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}`)
    next()
}

//Create array of cities by the requested country
const matchCities = (req, res, next) => {
    let response = [], 
        url = req.url.split("/"),
        requestedCountry = url[url.length - 1]
    cities.forEach((item) => {
        item.country === requestedCountry && response.push(item)
    })
    req.jsonData = response
    next()
}

//Receive all data from the post request
const receivePostData = (req, res, next) => {
    let receivedData = ""
    req.on("data", (chunk) => {
        receivedData += chunk.toString()
    })
    req.postData = receivedData
    next()
}

//HANDLERS
const getCitiesHandler = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.end(JSON.stringify(req.jsonData))
}

const getCountriesHandler = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.end(JSON.stringify(countries))
}

const postCountriesHandler = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.end(JSON.stringify(req.postData))
}

const postCitiesHandler = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.end(JSON.stringify(req.postData))
}

//GET requests
app.get('/api/country/list', [middlewareLogger], getCountriesHandler)
app.get('/api/city/list/[A-Za-z]+', [middlewareLogger, matchCities], getCitiesHandler)

//POST requests
app.post('/api/country', [middlewareLogger, receivePostData], postCountriesHandler)
app.post('/api/city', [middlewareLogger, receivePostData], postCitiesHandler)

//Listen server
app.listen(port, () => {
    console.log(`Express server listening on http://${hostname}:${port}`)
})