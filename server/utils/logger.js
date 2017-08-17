/**
 * Created by shahartaite on 12/09/2016.
 */
const winston = require('winston');
//require('winston-papertrail').Papertrail;
const config = require('config');
//const logzioWinstonTransport = require('winston-logzio');
// const loggerOptions = {
//     token: 'aEsVYyAPKmXxcABvaTmSghssREfLuZAb',
//     host: 'listener.logz.io',
//     type: 'nodejs'     // OPTIONAL (If none is set, it will be 'nodejs')
// };

winston.emitErrs = true;

const logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: config.get('hari.logger.file.level'),
            filename: config.get('hari.logger.file.location'),
            handleExceptions: true,
            json: false,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: true,
        }),
        new winston.transports.Console({
            level: config.get('hari.logger.console.level'),
            handleExceptions: true,
            json: false,
            colorize: true,
            prettyPrint: true,
        }),
        // new winston.transports.Papertrail({
        //     host: 'logs6.papertrailapp.com',
        //     port: 37145,
        //     flushOnClose : true
        // })
    ],
    exitOnError: false
});
const env = process.env.NODE_ENV || 'dev';
// if(env === 'production') {
//     logger.add(logzioWinstonTransport, loggerOptions);
// }

module.exports = logger;
module.exports.stream = {
    write: function (message, encoding) {
        logger.info(message);
    }
};