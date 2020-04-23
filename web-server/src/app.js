const path = require('path')
const express = require('express')
const hbs = require('hbs')

// express is a function that is called to make a new express application
const app = express()

// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '../public'))

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Handlebars npm module will allow us to render dynamic documents, and easily 
// create code that we can reuse across pages
// Kinda allows for php like features ^^
// We will use hbs npm module because its easy to integrate with express
// hbs files should be in the root directory in a folder called views
app.set('view engine', 'hbs')
// Can customize name and location by the code below
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Set up static directory to serve (looks for index.html for the rool of the webapp)
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    //use render to render a view (hbs template)
    // since we already set up express to use hbs, we just need to supply to view name we want to use
    res.render('index', {
        title: 'Weather App',
        name: 'Prithvi Velpuri'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Prithvi Velpuri"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: "This is some helpful text",
        title: "Help",
        name: "Prithvi Velpuri"
    })
})

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Prithvi',
//         age: 21
//     },
//     {
//         name: 'Maria',
//         age: 20
//     }
//     ])
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    res.send({
        forecast: 'Cloudy with a chance of meatballs',
        location: 'North Dakota',
        address: req.query.address
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404Page', {
        title: "Error 404",
        errorMessage: "Help article not found",
        name: "Prithvi Velpuri" 
    })
})

app.get('*', (req, res) => {
    res.render('404Page', {
        title: "404",
        errorMessage: "Page Not Found",
        name: "Prithvi Velpuri" 
    })
})

// routes ex:
// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
    console.log('Server started up on port 3000')
})