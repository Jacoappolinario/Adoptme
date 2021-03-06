const User = require('../models/User')

module.exports = {
    registerForm(req, res) {
        return res.render("user/register")
    },
    async show(req, res) {
        const { user } = req
        
        return res.render('user/index', { user })
    },
    async post(req, res) {

        const userId = await User.create(req.body)

        req.session.userId = userId

        return res.redirect('/users')
    },
    async update(req, res) {
        try {
            const { user } = req

            let { name, email } = req.body 

            await User.update(user.id, {
                name,
                email
            })

            return res.render("user/index", {
                user: req.body,
                success: "Conta atualizada com sucesso!"
            })

        } catch(err) {
            console.error(err)
            return res.render("user/index", {
                error: "Algum erro aconteceu!"
            })
        }
    },
    async delete(req, res) {
        try {
            await User.delete(req.body.id)
            req.session.destroy()

            return res.render("session/login", {
                success: "Conta deletada com sucesso!"
            })

        } catch(err) {
            console.error(err)
            return res.render("user/index", {
                user: req.body,
                error: "Erro ao tentar deletar sua conta!"
            })
        }
    }
}