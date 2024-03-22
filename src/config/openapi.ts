import {apiReference} from '@scalar/express-api-reference'
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'SMC PAY Documentation',
            version: '1.0.0',
        },
    },
    apis: ['./src/routes/*.ts'],
};

const openapi = swaggerJsdoc(options);

export default openapi;