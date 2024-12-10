import morgan, { StreamOptions } from 'morgan';
import { logger } from '../log/logger';

/* Escribir mensajes con nivel del log http */
const stream: StreamOptions = {
  write: (message) => logger.http(message)
};

/* Crear formato de traza para request http */
const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream }
);

export default morganMiddleware;
