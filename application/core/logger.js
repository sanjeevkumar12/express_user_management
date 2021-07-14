const winston = require('winston');
const path = require('path')
const settings = require('../config')

const LOG_DIR = path.join(path.dirname(path.dirname(__dirname)), 'logs');
const transports = [];

if (settings.APP_ENV !== 'development' && settings.APP_ENV !== 'test') {
    transports.push(
        new winston.transports.File({
            filename: path.join(LOG_DIR, 'errors.log'),
            level: 'error'
        }),
        new winston.transports.File({
            filename: path.join(LOG_DIR, 'warnings.log'),
            level: 'warn'
        }),
        new winston.transports.File({
            filename: path.join(LOG_DIR, 'infos.log'),
            level: 'info'
        }),
    )
} else {
    transports.push(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.cli(),
                winston.format.splat()
            )
        })
    )
}

const loggerInstance =  winston.createLogger({
    level: "",
    levels: winston.config.npm.levels,
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.json()
    ),
    transports
});

module.exports = loggerInstance;