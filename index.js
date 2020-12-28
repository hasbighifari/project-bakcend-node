require('dotenv').config()
const express = require('express')
const app = express()
const winston = require('winston')
const logger = require('./middleware/logger')
require('./startup/routes')(app)
require('./startup/db')(process.env.DBCONNECT)

app.listen(process.env.PORT, () => {
    logger.info(`listening port ${process.env.PORT}...`)
})

module.exports = app