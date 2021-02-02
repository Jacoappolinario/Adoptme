const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer')

const PetController = require('../app/controllers/PetController')

// Routes Pets
routes.get('/pets/create', PetController.create)
// routes.get('/pets/:id', PetController.show)
routes.get('/pets/:id/edit', PetController.edit)

routes.post('/pets', multer.array("photos", 6), PetController.post)
// routes.put('/pets', multer.array("photos", 6), PetController.put)
// routes.delete('/pets', PetController.delete)

// Alias
routes.get('/ads/create', function(req, res) {
    return res.redirect("/pets/create")
})

module.exports = routes