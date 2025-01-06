import Router from 'express';
import swaggerUi from 'swagger-ui-express';
import packageJson from '../../../package.json';
import { paths } from './paths.swagger';
import { servers } from './server.swagger';

const optionsSwagger = {
  customSiteTitle: 'API Hexagonal - Docs',
  customCssUrl: '/swaggerStyle.css'
};
const options = {
  openapi: '3.0.3',
  info: {
    title: 'API Hexagonal',
    version: packageJson.version,
    description: packageJson.description
  },
  servers,
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'apiKey',
        name: 'authorization',
        scheme: 'bearer',
        in: 'header'
      }
    }
  },
  security: [
    {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer'
      }
    }
  ],
  paths
};

const docsRouter = Router();
docsRouter.use('/', swaggerUi.serve, swaggerUi.setup(options, optionsSwagger));

export default docsRouter;
