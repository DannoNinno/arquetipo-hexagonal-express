import express from 'express';
import { indexRoutes } from './routes/indice.routes';

// Este Router debe ir en el archivo del servidor de express
const AppRouter = express.Router();
// Aqui deben ir todos los componentes del indice del router.
AppRouter.use('/', indexRoutes.root);

export default AppRouter;
