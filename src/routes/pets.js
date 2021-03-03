const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer')

const PetController = require('../app/controllers/PetController')

const { onlyUsers } = require('../app/middlewares/session')

// Routes Pets
routes.get('/create', onlyUsers, PetController.create)
routes.get('/:id', PetController.show)
routes.get('/:id/edit', onlyUsers, PetController.edit)

routes.post('/', onlyUsers, multer.array("photos", 6), PetController.post)
routes.put('/', onlyUsers, multer.array("photos", 6), PetController.put)
routes.delete('/', onlyUsers, PetController.delete)

module.exports = routes