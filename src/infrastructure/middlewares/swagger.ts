export const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Companies API',
      version: '0.0.0',
      description: 'API hexagonal.'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: ['./src/app/router/routes/*.ts']
};
