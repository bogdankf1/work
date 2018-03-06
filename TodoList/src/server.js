const http = require('http')
const fs = require('fs')

//Set server hostname and port 
const hostname = '127.0.0.1'
const port = 3000

//Get data from .json files
const cities = JSON.parse(fs.readFileSync('cities.json'))
const countries = JSON.parse(fs.readFileSync('countries.json'))

const sendCities = (request) => {
    let response = [], 
        url = request.url.split("/"),
        requestedCountry = url[url.length - 1]
    cities.forEach((item) => {
        item.country === requestedCountry && response.push(item)
    })
    return response
}

//Create server and set API responses
const server = http.createServer((request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.writeHead(200, {"Content-Type": "text/plain"})

    if(~request.url.indexOf("/api/country/list") && request.method === "GET") {
        //Return list of countries
        response.end(JSON.stringify(countries))
    } else if(~request.url.indexOf("/api/city/list") && request.method === "GET") {
        //Return list of cities in requested country
        response.end(JSON.stringify(sendCities(request)))
    } else if(~request.url.indexOf("/api/country") && request.method === "POST") {
        // response.end(JSON.stringify("Response on test request"))
        // console.log(request)
    } else if(~request.url.indexOf("/api/city") && request.method === "POST") {

    } else {
        console.log("Invalid API request!")
    }
})

//Listen the server on current hostname and port
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})