/**
 * Created by shahartaite on 08/09/2016.
 */

const measurementsRouter = require('rest/endpoints/measurements_router');
const jwt = require('express-jwt');
const jsonWebToken = require('jsonwebtoken');
const jwks = require('jwks-rsa');

const setupPaths = (app) => {

    const jwtCheck = jwt({
        secret: jwks.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: "https://3dsignals.eu.auth0.com/.well-known/jwks.json"
        }),
        issuer: "https://3dsignals.eu.auth0.com/",
        algorithms: ['RS256'],
        getToken: function fromHeaderOrQuerystring (req) {
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                return req.headers.authorization.split(' ')[1];
            } else if (req.query && req.query.token) {
                return req.query.token;
            }
            return null;
        }
    });
    //todo make this work again
    //app.use(jwtCheck.unless({path: ['/login','/analysis','/status','/event_labeling','/','/assets/app.js']}));
    setupRouters(app);
};

const setupRouters = (app) => {
    const measurementsRouterObj = measurementsRouter.setupRouter();
    app.use('/measurements', measurementsRouterObj);
}

module.exports = {
    setupPaths
};
