const express = require('express')
const auth = require('../routes/auth')
const user = require('../routes/user')
const todo = require('../routes/todo')
const bodyParser = require('body-parser')
const error = require('../middleware/error')
const cors = require('cors')

module.exports = (app) => {
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(cors({
        exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar','token','x-auth-token'],
    }))
    app.use('/api/auth', auth)
    app.use('/api/auth', user)
    app.use('/api/todo', todo)
    app.use(error)
}