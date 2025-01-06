import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { createHttpTerminator, HttpTerminator } from 'http-terminator';

import { EXPRESS } from '../../environment';
import { logger } from '../log/logger';

import compression from 'compression';
import morganMiddleware from '../middlewares/morgan';
import apiHealth from '../api-health/api-health.routes';
import { errorHandler } from '../middlewares/errorHandler';

import routerDoc from '../docs/config.swagger';
import AppRouter from '../../app/router/enrutador';

const app = express();
const port = Number(EXPRESS.port);

/** MIDDLEWARES */
/* Uso de compresion en las respuestas http */
app.use(
  compression({
    threshold: 0
  })
);

/* manejo de errores */
app.use(errorHandler);

/* Uso de libreria morgan para generar logs de llamadas http, hace un proxy al framework de logs winston */
app.use(morganMiddleware);

/* Habilitacion de cors en servidor express */
app.use(cors({ origin: true }));

/** Permite hacer un parseo automatico de mensajes que traen un body con content-type x-ww-form-urlencoded */
app.use(
  express.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true
  })
);

/* Permite hacer un parseo automatico de mensajes que traen un body con content-type application/json */
app.use(
  express.json({
    limit: '50mb'
  })
);

/* Permite hacer un parseo automatico de mensajes que traen un body con content-type text/plain */
app.use(express.text());

/* RUTAS */
/* Rutas de aplicacion */
app.use('/', AppRouter);
/* Rutas para monitorear la salud de la API */
app.use('/', apiHealth);

/* Rutas de documentacion de swagger */
app.use('/swagger-ui', routerDoc);
/* Modulo que permite cerrar las conexiones http al cerrar express de forma segura y controlada */
let httpTerminator: HttpTerminator;

const startExpressServer = () => {
  const server = app
    .listen(port, () => {
      logger.info(`[Express] => Está inicializado en el puerto: ${port}`);
      httpTerminator = createHttpTerminator({ server });
    })
    .on('error', (e: any) => {
      logger.error('[Express] => Error al inicializar express: ', e.message);
      process.kill(process.pid, 'SIGINT');
    });
};

const stopExpressServer = async () => {
  logger.info('[Express] - Terminando servicios rest');
  return await httpTerminator?.terminate();
};

export { startExpressServer, stopExpressServer };
export default app;
