const path = require('path') // core node module
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express() // express is just a function and not object. does not take any arguments
const port = process.env.PORT || 3000 // the port was set as 3000 till heroku was used. now when application is being deployed on heroku 3000 does not amke sense as it is a local port. so heroku gives its own port number which is available at process.env.PORT

const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setting up handlebars
app.set('view engine', 'hbs') // key-value pair; this single line is all we need to get handlebars setup
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

//rendering views
app.get('', (req, res) => {
    res.render('index', {
        name: 'Thaijasa',
        title: 'Weather Application'

    })
    //render allows us to render one of our views. by calling render express goes off and calls the view specified and then converts it into html and renders it at the browser
    // 1st argument: view name; 2nd argument: is an object which contains all of the values u want that view to be able to access
})

app.get('/about', (req, res) => {
    res.render('about', {
        name:'Thaijasa',
        title: 'About Me'

    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        msg: 'This page is a help page',
        title: 'Help Page',
        name: 'Thaijasa'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }
    geocode((req.query.address), (error, data) => {
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                latitude: data.latitude,
                longitude: data.longitude,
                location: data.location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: "It is very hot today in San Jose",
    //     location: "San Jose",
    //     address: req.query.address

    // })
})



//route handler for a 404 page : wildcard character - * 
app.get('/help/*', (req, res) => {
    res.render('404page', {
        errormessage: 'Help article not found',
        title:'404',
        name:'Thaijasa'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        errormessage: 'Page not found',
        title:'404',
        name:'Thaijasa'
    })
})

app.listen(port, () =>{
    console.log("Server is up and running on port " + port + "!!")
})


// THIS IS COMMENTED BECAUSE, ITS OF NO USE ONCE THE PUBLIC FOLDER PATH IS SET UP TO EXPRESS (ABOVE CODE)
// app.get("", (req, res) => {
//     res.send("<h1>Hello Express !!</h1>")
// }) 

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Thaijasa',
//         age: 27
//     },
// {
//     name: 'Andrew',
//     age:30
// }])
// })

// app.get('/about', (req,res) => {
//     res.send("<h4>Thaijasa - Author of the web app</h4>") // if html contents are very long, makes sense to create a dedicated html page
// })




/* NOTES

.   app.com ------ this will be the only domain
    app.com/help -------- these are routes
    app.com/about --------- these are routes 

.   app.get -- what the server should do when someone tries to get the url
    it takes in two arguments=> one - route,
                                second - function - what to do when someone visits this route; what to render
                                    request, response are the arguments

. app.listen - starts the server and listens on theport specified; callback function argument is optional

. app.use - is a way to customise your server. here, we are just customising the server to choose the public folder path
    express.static is a function. we are passing its return value into app.use
    static takes public dir path

. public - this is the only directory exposed to the web server, so all files that need to be served shud be present inside this 
. <!-- the name ' index ' means it comes served up by default; "index.html" has a special meaning when it comes to web servers -->

. -- TEMPLATE ENGINE - handlebars --
    . allows us to render dynamic content
    . allows code reuse: example|| have header markup in one place and reuse it in all pages. otherwise u shud have written header code in all pages
    . two npm modules. 1) handlebars (low level library) 2) hbs (plug in for express, uses handlebars b-t-s)
    . hbs pages are just like html pages

. Partials with handlebars

. INTEGRATION OF BACKEND AND FRONTEND
. 
*/ 

