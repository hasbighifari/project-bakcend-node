const mongoose = require('mongoose')
const winston = require('winston')
const logger = require('../middleware/logger')

module.exports = (dbconnect) => {
    mongoose.connect(dbconnect, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false

    }).then(() => logger.info('CONNECT TO ' + dbconnect))
    .catch(e=> logger.error(e))
} 