const logger = require('../middleware/logger')

module.exports = (err, req, res, next) => {
    logger.error(err)
    // console.log('err',err)
    res.status(500).send({ errorMessage:'internal error server'})
}