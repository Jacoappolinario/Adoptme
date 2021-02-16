const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer')

const PetController = require('../app/controllers/PetController')

// Routes Pets
routes.get('/create', PetController.create)
routes.get('/:id', PetController.show)
routes.get('/:id/edit', PetController.edit)

routes.post('/', multer.array("photos", 6), PetController.post)
routes.put('/', multer.array("photos", 6), PetController.put)
routes.delete('/', PetController.delete)

module.exports = routes