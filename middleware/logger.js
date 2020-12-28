const winston = require('winston')

exports.info = (i) => {
    return winston.createLogger({
        transports: [
            new winston.transports.Console({
                level: 'info',
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple()
                )
            }),
        ]
    }).info(i)
}
exports.error = (e) => {
    return winston.createLogger({
        transports: [
            new winston.transports.Console({
                level: 'error',
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.prettyPrint(),
                )
            }),
        ]
    }).error(e.message, e)
}