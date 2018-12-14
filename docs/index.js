const express = require('express');
const app = express();
const expressSwagger = require('express-swagger-generator')(app);
const port = 3000;

let options = {
    swaggerDefinition: {
        info: {
            description: 'Lenden CSS API Documentation',
            title: 'CSS',
            version: '0.0.1alpha',
        },
        host: 'localhost:4000',
        basePath: '/api/css/v1',
        produces: [
            "application/json",
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            },
            Hack: {
                type: 'apiKey',
                in: 'header',
                name: 'userId',
                description: 'userId'
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['../server/**/*.route.js'] //Path to the API handle folder
};
expressSwagger(options)
app.listen(port, '0.0.0.0', () => {
    console.log(`listening on port ${port}`);
});

