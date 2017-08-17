/**
 * Created by shahartaite on 08/09/2016.
 */
require('app-module-path').addPath(__dirname); // allow
const serverInitialization = require('./server_initialization');
const utils = require('./utils/utils');
const logger = require('./utils/logger');
const consts = require('./utils/consts');


// let it crash - change to something else...
process.on('uncaughtException', function(err) {
    utils.logGenerelError(err, consts.LOGGING_ERROR_TYPES.UNCAUGHT_EXCEPTION);
});
utils.logSimpleTextError('server starting',consts.LOGGING_ERROR_TYPES.SOME_MORE_ERROR_INFO);
const app = serverInitialization.initializeExpressRestServer();
logger.info('initialized REST server');
serverInitialization.setupHttpServer(app);
logger.info('initialized http server');
logger.info('server ready');
