//Require needed modules
const http = require('http')
const fs = require('fs')
const express = require('express')

const app = express()

//Set server hostname and port 
const hostname = '127.0.0.1'
const port = 3000

//Get data from .json files
const cities = JSON.parse(fs.readFileSync('cities.json'))
const countries = JSON.parse(fs.readFileSync('countries.json'))

//Create array of cities by the requested country
const matchCities = (request) => {
    let response = [], 
        url = request.url.split("/"),
        requestedCountry = url[url.length - 1]
    cities.forEach((item) => {
        item.country === requestedCountry && response.push(item)
    })
    return response
}

//Receive all data from the post request
const getPostData = (request, response) => {
    let receivedData = ""
    request.on("data", (chunk) => {
        receivedData += chunk.toString()
    })
    return receivedData
}

// const matchUrl = (req, expectedUrl, expectedMethod) => {
//     if(req.url.indexOf(expectedUrl) === -1 || req.method !== expectedMethod) {
//         return false
//     } else {
//         return true
//     }
// }

// //Middlewares
// const middlewareCountryList = (req, res, next) => {
//     if(matchUrl(req, "/api/country/list", "GET")) {

//     }
//     res.end(data)
// }

// const getCountryList = (req, res, next) => {
//     JSON.stringify(countries)
//         sendCountryList(data)
//     next()
// }

// const getCityList = (req, res, next) => {
//     if(req.url.indexOf("/api/city/list") === -1 || req.method !== "GET") {
//         return
//     }
//     matchCities(req)
//     .then((data) => {
//         res.end(JSON.stringify(data))
//     })

//     // next()
// }

// const postCountry = (req, res, next) => {
//     getPostData(req, res)
//     .then((data) => {
//         res.end(JSON.stringify(data))
//     })

//     next()
// }

// const postCity = (req, res, next) => {
//     getPostData(req, res)
//     .then((data) => {
//         res.end(JSON.stringify(data))
//     })
// }

//Create server and set API responses
// const server = http.createServer((request, response) => {
//     response.setHeader('Access-Control-Allow-Origin', '*')

    
//     const url = request.url,
//           method = request.method
//     if(url.indexOf("/api/country/list") !== -1 && method === "GET") {
//         response.end(JSON.stringify(countries))
//     } else if(url.indexOf("/api/city/list") !== -1 && method === "GET") {
//         response.end(JSON.stringify(matchCities(request)))
//     } else if(url.indexOf("/api/country") !== -1 && method === "POST") {
//         response.end(JSON.stringify(getPostData(request)))
//     } else if(url.indexOf("/api/city") !== -1 && method === "POST") {
//         response.end(JSON.stringify(getPostData(request)))
//     } else {
//         console.log("Invalid API request!")
//     }
// })

// //Listen the server on current hostname and port
// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}`)
// })

app.get('/api/country/list', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.end(JSON.stringify(countries))
})
app.get('/api/city/list/[A-Za-z]+', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.end(JSON.stringify(matchCities(request)))
})

app.post('/api/country', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.end(JSON.stringify(getPostData(request)))
})
app.post('/api/city', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.end(JSON.stringify(getPostData(request)))
})

app.listen(port, () => {
    console.log(`Express server listening on http://localhost:${port}`)
})