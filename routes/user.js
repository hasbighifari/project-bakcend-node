const express = require('express')
const Joi = require('joi')
const route = express.Router()
const asycnMiddleware = require('../middleware/asycn')
const { User } = require('../models/User')
const bcrypt = require('bcrypt')

const validate = (req) => {
    let schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
        name: Joi.string().min(2).max(255).required()
    })
    return schema.validate(req)
}

route.post('/register', asycnMiddleware(async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.send({ errorMessage: error.details[0].message })
    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(401).send({ errorMessage: 'User is already register' })
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password
    })
    await user.save()
    const token = user.generateAuthToken(user)
    res.header('token',token)
    res.header('x-auth-token', token)
    res.send({})
}))

module.exports = route


