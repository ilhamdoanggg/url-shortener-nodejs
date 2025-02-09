const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'URL Shortener API',
			version: '1.0.0',
			description: 'API Creates a new short URL for a given long URL and optional custom alias',
		},
		servers: [{ url: 'http://localhost:3000' }],
	},
	apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
	app.use(
		'/api/docs',
		swaggerUi.serve,
		swaggerUi.setup(swaggerSpec, {
			customCss: `.swagger-ui {
          background-color: #f8f9fa !important;
        }

        .swagger-ui .topbar {
          background-color: #007bff !important;
        }
        .swagger-ui .info h1 {
          color: #343a40 !important;
          font-size: 26px !important;
        }
        .swagger-ui .btn {
          background-color: #28a745 !important;
          border-radius: 8px !important;
          font-weight: bold;
        }
        .swagger-ui .response-col_status {
          color: #d9534f !important;
          font-weight: bold;
        }`,
		})
	);
  console.log(process.env.URL);
  
	console.log( `Swagger docs available at ${process.env.URL}/api-docs`);
};

module.exports = swaggerDocs;
