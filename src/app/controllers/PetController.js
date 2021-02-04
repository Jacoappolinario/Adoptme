const Category = require('../models/Category')
const Pet = require('../models/Pet')
const File = require('../models/File')
const { date } = require('../../lib/utils')

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

        return res.redirect(`/pets/${petId}/edit`)
    },
    async show(req, res) {
        let results = await Pet.find(req.params.id)
        const pet= results.rows[0]

        if (!pet) return res.send("product Not Found!")

        const { day, hour, minutes, month } = date(pet.updated_at)

        pet.published = {
            day: `${day}/${month}`,
            hour: `${hour}h${minutes}`
        }

        results = await Pet.files(pet.id)
        const files = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

        return res.render("pets/show", { pet, files })
    },
    async edit(req, res) {
        let results = await Pet.find(req.params.id)
        const pet = results.rows[0]

        if (!pet) return res.send("Pet not found")

        //get categories
        results = await Category.all()
        const categories = results.rows

        //get images
        results = await Pet.files(pet.id)
        let files = results.rows
        files = files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

        return res.render("pets/edit.njk", { pet, categories, files })
    },
    async put(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "" && key != "removed_files") {
                return res.send('Please, fill all fields!')
            }
        }

        //Insere novas imagens
        if (req.files.length != 0) {
            const newFilePromise = req.files.map(file => 
                File.create({...file, pet_id: req.body.id}))
                
            await Promise.all(newFilePromise)
        }

        // Remove imagens
        if (req.body.removed_files) {
            // 1,2,3
            const removedFiles = req.body.removed_files.split(",") // [1,2,3]
            const lastIndex = removedFiles.length - 1 //Pega o ultimo id dentro do array
            removedFiles.splice(lastIndex, 1) 

            const removedFilesPromise = removedFiles.map(id => File.delete(id))

            await Promise.all(removedFilesPromise)
        }

        await Pet.update(req.body)

        return res.redirect(`/pets/${req.body.id}`)
    },
    async delete(req, res) {
        await Pet.delete(req.body.id)

        return res.redirect('/pets/create')
    }
}