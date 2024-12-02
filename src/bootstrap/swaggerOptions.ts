import swaggerJsDoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cop16 API",
      version: "1.0.0",
      description: "A simple express library API",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Development server api version 1",
      },
    ],
  },
  apis: [
    "./src/routes/v1/*.ts"
  ],
};

const specs = swaggerJsDoc(options);

export default specs;
