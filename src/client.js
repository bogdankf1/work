const http = require('http')

//OPTIONS
//GET requests options
const optionsCountriesGet = {
    host: '127.0.0.1',
    port: '8080',
    headers: {"type":"countries"},
    // path: "/api/country/list"
}
const optionsCitiesGet = {
    host: '127.0.0.1',
    port: '8080',
    headers: {"type":"cities"},
    // path: "/api/city/list/{countryName}"
}

//POST requests options
const optionsCountriesPost = {
    host: '127.0.0.1',
    port: '8080',
    method: "POST",
    headers: {"type":"countries"},
    // path: "/api/country"
}
const optionsCitiesPost = {
    host: '127.0.0.1',
    port: '8080',
    method: "POST",
    headers: {"type":"cities"},
    // path: "/api/city"
}

//REQUESTS
//GET requests
const getCountries = (response) => {
    let countries = []
    response.on('data', (data) => {
        countries = JSON.parse(data)
    })

    response.on('end', () => {
        console.log("Countries(GET):", countries)
    })
}
const getCitiesByCountryName = (response) => {
    let cities = []
    response.on('data', (data) => {
        cities = JSON.parse(data)
    })

    response.on('end', () => {
        console.log("Cities(GET):")
        for(let i = 0; i < cities.length; i++) {
            if(cities[i].country === "Ukraine") {
                console.log(cities[i].name)
            }
        }
    })
}

//POST requests
const postCountries = (response) => {
    let countries = []
    response.on('data', (data) => {
        countries = JSON.parse(data)
    })

    response.on('end', () => {
        console.log("Countries(POST):", countries)
    })
}
const postCities = (response) => {
    let cities = []
    response.on('data', (data) => {
        cities = JSON.parse(data)
    })

    response.on('end', () => {
        console.log("Cities(POST):", cities)
    })
}

//Make requests
const requestGetCountries = http.request(optionsCountriesGet, getCountries)
requestGetCountries.end()

const requestGetCities = http.request(optionsCitiesGet, getCitiesByCountryName)
requestGetCities.end()

const requestPostCountries = http.request(optionsCountriesPost, postCountries)
requestPostCountries.end()

const requestPostCities = http.request(optionsCitiesPost, postCities)
requestPostCities.end()