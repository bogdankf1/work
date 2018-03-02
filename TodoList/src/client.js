const http = require('http')

const options = {
    host: '127.0.0.1',
    port: '8080',
    path: '/test.html'
}

const getCountryList = (response) => {
    let res = []
    response.on('data', (data) => {
        res = JSON.parse(data)
    })

    response.on('end', () => {
        console.log(res)
    })
}

const req = http.request(options, getCountryList)
req.end()