const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer')

const PetController = require('../app/controllers/PetController')

// Routes Pets
routes.get('/pets/create', PetController.create)
routes.post('/pets', multer.array("photos", 6), PetController.post)

// Alias
routes.get('/ads/create', function(req, res) {
    return res.redirect("/pets/create")
})

module.exports = routes