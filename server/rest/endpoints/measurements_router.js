
const express = require('express');
const logger = require('utils/logger');

const setupRouter = () => {
    const measurementsRouter = express.Router();
    
    measurementsRouter.get('/test', (req, res) => {
        logger.debug('express success!!!!');
        res.json({'success': true});
    });
    
    return measurementsRouter;
}

module.exports = {
    setupRouter
}