const express = require('express')
const routes = express.Router()

const pets =  require('./pets')
const users = require('./users')

routes.get('/', function(req, res) {
    return res.render("layout.njk")
})

routes.use('/pets', pets)
routes.use('/users', users)

// Alias
routes.get('/ads/create', function(req, res) {
    return res.redirect("/pets/create")
})


module.exports = routes