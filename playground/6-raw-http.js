const https = require('https')

// Learning the HTTPS core node module
// and why request npm module is better

const url = 'https://api.darksky.net/forecast/c8cdd859059a5be11e933440bf0bf270/40,-75'

const request = https.request(url, (response) => {

    let data = ''

    response.on('data', (chunk) => {
        data = data + chunk.toString()
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })
})

request.on('error', (error) => {
    console.log("An error has occurred ", error)
})

request.end()