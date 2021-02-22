const User = require('../models/User')

async function post(req, res, next) {
    //check if has all fields
    const keys = Object.keys(req.body)

    for(key of keys) {
        if (req.body[key] == "") {
            return res.render('user/register', {
                user: req.body,
                error: 'Por favor, preencha todos os campos.'
            })
        }
    }

    //check if user exists [Email]
    const { email, password, passwordRepeat } = req.body
    const user = await User.findOne({
        where: { email }
    })

    if (user) return res.render('user/register', {
        user: req.body,
        error: 'Usuário já cadastrado.'
    })

    //check if password match
    if (password != passwordRepeat) return res.render('user/register', {
        user: req.body,
        error: 'A senha e a repetição da senha estão incorretas.'
    })

    next()
}

module.exports = {
    post
}