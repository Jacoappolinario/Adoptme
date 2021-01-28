const Category = require('../models/Category')
const Pet = require('../models/Pet')
const File = require('../models/File')

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

        if (req.files.length == 0)
            return res.send('Please, send at last one image')


        let results = await Pet.create(req.body)
        const petId = results.rows[0].id

        const filesPromise = req.files.map(file => File.create({...file, pet_id: petId}))
        await Promise.all(filesPromise)

        return res.send("cadastrado!")
    }
}