'use strict';

var SwaggerExpress = require('swagger-express-mw');
var swagger = require('swagger-tools');
var http = require('http');
var app = require('express')();
var dbModels = require('../src/mongo/mongoose')();
module.exports = app; // for testing

var swaggerObject = require('./api/swagger/swagger.yaml');

swagger.initializeMiddleware(swaggerObject, function (middleware) {
    // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
    app.use(middleware.swaggerMetadata());

    // Provide the security handlers
    app.use(middleware.swaggerSecurity({
        oauth2: function (req, def, scopes, callback) {
            // Do real stuff here
        }
    }));

    app.use((req, res, next) => {
        req.context = dbModels;
        next();
    });

    // Validate Swagger requests
    app.use(middleware.swaggerValidator({
        validateResponse: true
    }));

    // Route validated requests to appropriate controller
    app.use(middleware.swaggerRouter({useStubs: true, controllers: './controllers'}));

    // Serve the Swagger documents and Swagger UI
    //   http://localhost:3000/docs => Swagger UI
    //   http://localhost:3000/api-docs => Swagger document
    app.use(middleware.swaggerUi());

    // Start the server
    http.createServer(app).listen(3000);
});

/*

var config = {
    appRoot: __dirname // required config
};

SwaggerExpress.create(config, function (err, swaggerExpress) {
    if (err) {
        throw err;
    }
    app.use((req, res, next) => {
        req.context = dbModels;
        next();
    });

    // install middleware
    swaggerExpress.register(app);


    var port = process.env.PORT || 10010;
    app.listen(port);

    if (swaggerExpress.runner.swagger.paths['/hello']) {
        console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Stranger');
    }
});
*/
