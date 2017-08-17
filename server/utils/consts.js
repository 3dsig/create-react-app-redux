
module.exports = {
    
    LOGGING_ERROR_TYPES : {
        HTTP_REST_ERROR : 'HTTP_REST_ERROR',
        UNCAUGHT_EXCEPTION : 'UNCAUGHT_EXCEPTION',
        SOME_MORE_ERROR_INFO : 'SOME_MORE_ERROR_INFO', //send the log and then don't forget to throw exception
        SOCKET_ERROR : 'SOCKET_ERROR',
        QUERY_RESULTED_WITH_NO_DATA : 'QUERY_RESULTED_WITH_NO_DATA',
    },
};
