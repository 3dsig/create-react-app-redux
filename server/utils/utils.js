const logger = require('utils/logger');
const consts = require('utils/consts');
const config = require('config');
const logHttpRequestError = (request, errorObj) => {
    const logObj = {
        server_type : config.get('ray.server_type'),
        message : errorObj.message,
        stack : errorObj.stack,
        url : request.url,
        userEmail : request.user.email,
        query : JSON.stringify(request.query),
        body : JSON.stringify(request.body),
        initiator : 'server',
        errorType : consts.LOGGING_ERROR_TYPES.HTTP_REST_ERROR,
    };
    logger.error(logObj);
};
const logGenerelError = (errorObj, errorType, otherProperties = {}) => {
    let logObj = {
        server_type : config.get('ray.server_type'),
        message : errorObj.message,
        stack : errorObj.stack,
        initiator : 'server',
        errorType,
        
    }
    logObj = Object.assign(otherProperties, logObj);
    logger.error(logObj);
}
const logSimpleTextError = (message, errorType, otherProperties = {}) => {
    let logObj = {
        server_type : config.get('ray.server_type'),
        message,
        errorType,
    }
    logObj = Object.assign(otherProperties, logObj);
    logger.error(logObj);
}

module.exports = {

    logHttpRequestError,
    logGenerelError,
    logSimpleTextError,
};