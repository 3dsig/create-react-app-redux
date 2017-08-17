/**
 * Created by shahartaite on 08/09/2016.
 */
const http = require('http');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const routes = require('./rest/routes');
const config = require('config');
const logger = require('./utils/logger');
const webpack = require('webpack');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const path = require('path');
const favicon = require('serve-favicon');

const initializeExpressRestServer = () => {
    const app = express();
    // gzip compression
    app.use(compression());
    app.use(bodyParser.json()); // get information from html forms
    
    if (process.env.NODE_ENV !== 'production') {
        logger.info('development $$$$$$$$$$$$')
        const webpackDevConfig = require('../config/webpack.config.dev');
        const compiler = webpack(webpackDevConfig);
        app.use(webpackDevMiddleware(compiler, {
            noInfo: true,
            publicPath: webpackDevConfig.output.publicPath,  // webpackDevConfig.output.publicPath,
            historyApiFallback: true
        }));
        app.use(webpackHotMiddleware(compiler));
        app.use(favicon(path.join(__dirname, 'favicon.ico')))
        routes.setupPaths(app);
        app.use((req, res, next) => {
            // if (req.query.token !== config.get('hari.authentication.token')) {
            //     res.status(401).end();
            // }
            //else {
                next();
            //}
        });
        //app.use('/static', express.static(path.join(__dirname, '../build/static')));
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../dist/index.html'));
        });
    }
    else {
        logger.info('production $$$$$$$$$$$$')
        app.use(favicon(path.join(__dirname, 'favicon.ico')));
        routes.setupPaths(app);
        logger.info(`now servering ${path.join(__dirname, '../build/static')}`)
        app.use('/static', express.static(path.join(__dirname, '../build/static')));
        // app.use((req, res, next) => {
        //     if (req.query.token !== config.get('hari.authentication.token')) {
        //         res.status(401).end();
        //     }
        //     else {
        //         next();
        //     }
        // });
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../build/index.html'));
        });
    }
    return app;
};
const setupHttpServer = (app) => {
    var server = http.Server(app);
    const port = config.get('hari.http_server.port');
    server.listen(port);
    logger.info(`server listening on port ${port}`);
    return server;
};
module.exports = {
    initializeExpressRestServer,
    setupHttpServer,
};

