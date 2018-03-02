const http = require('http')
const fs = require('fs')

const hostname = '127.0.0.1'
const port = 8080

const citiesData = fs.readFileSync('cities.txt')
const countriesData = fs.readFileSync('countries.txt')

const cities = JSON.parse(citiesData)
const countries = JSON.parse(countriesData)

const server = http.createServer((req, res) => {
    
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end(JSON.stringify(countries))
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})