const Category = require('../models/Category')
const Pet = require('../models/Pet')

module.exports = {
    async create(req, res) {
        let results = await Category.all()
        const categories = results.rows

        return res.render("pets/create.njk", { categories })
    },
    async post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all fields")
            }
        }

        let results = await Pet.create(req.body)
        const petId = results.rows[0].id

        return res.send("cadastrado!")
    }
}