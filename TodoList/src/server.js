const http = require('http')
const fs = require('fs')

const hostname = '127.0.0.1'
const port = 8080

const citiesData = fs.readFileSync('cities.json')
const countriesData = fs.readFileSync('countries.json')

const cities = JSON.parse(citiesData)
const countries = JSON.parse(countriesData)

const server = http.createServer((request, response) => {
    console.log(request.url)
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.writeHead(200, {"Content-Type": "text/plain"})
    if(request.url === "/api/country/list") {
        response.end(JSON.stringify(countries))
    } else if(request.url === "/api/city/list/Spain") {
        let res = []
        for(let i = 0; i < cities.length; i++) {
            if(cities[i].country === "Spain") {
                res.push(cities[i])
            }
        }
        response.end(JSON.stringify(res))
    } else if(request.url === "/api/country") {

    } else if(request.url === "/api/city") {

    } else {

    }
    // response.end("Hello World\n");
    // response.setHeader('Content-Type', 'text/plain')
    // let res = ""
    // if(request.headers.type === "countries") {
    //     res = JSON.stringify(countries)
    // } else if(request.headers.type === "cities") {
    //     res = JSON.stringify(cities)
    // }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})