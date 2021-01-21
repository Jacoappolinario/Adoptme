const Category = require('../models/Category')

module.exports = {
    async create(req, res) {
        let results = await Category.all()
        const categories = results.rows

        return res.render("pets/create.njk", { categories })
    },
    post(req, res) {
        return res.send(req.body)
    }
}