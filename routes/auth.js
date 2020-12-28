const express = require('express')
const Joi = require('joi')
const route = express.Router()
const bcrypt = require('bcrypt')
const asycnMiddleWare = require('../middleware/asycn')
const { User } = require('../models/User')

const validateAuth = (req) => {
    const Schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    })
    return Schema.validate(req)
}


route.post('/login', asycnMiddleWare(async (req, res) => {
    const { error } = validateAuth(req.body)
    if (error) return res.status(401).send({ errorMessage: error.details[0].message })
    let userAuth = await User.findOne({ email: req.body.email })
    if (!userAuth) return res.status(401).send({ errorMessage: 'email is not registered' })
    let validatePassword = await bcrypt.compare(req.body.password, userAuth.password)
    if (!validatePassword) return res.status(401).send({ errorMessage: 'password is invalid' })
    const token = userAuth.generateAuthToken(userAuth)
    res.header('token',token)
    res.header('x-auth-token', token)
    res.send({})
}))

route.post('/logout', asycnMiddleWare(async (req, res) => {
    res.send({})
}))

module.exports = route
