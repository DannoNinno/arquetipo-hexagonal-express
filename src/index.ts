import {
  startExpressServer,
  stopExpressServer
} from './infrastructure/express/express-server';
import { logger } from './infrastructure/log/logger';

async function shutDown(signal: NodeJS.Signals) {
  logger.info('[POD-CONTROL] => Señal arrojada terminacion de proceso', signal);

  //Cerrando conexiones y servidores
  await Promise.all([stopExpressServer()]).then(() => {
    logger.info('[POD-CONTROL] => Terminando aplicacion...');
    process.nextTick(process.exit(0));
  });

  setTimeout(() => {
    logger.error('[API] => Conexiones no cerradas a tiempo, forzando cierre');
    process.exit(1);
  }, 10000);
}

async function startup() {
  logger.info('[APP] => Inicializando aplicacion.');
  try {
    startExpressServer();
  } catch (error) {
    logger.error(
      '[API] => No fue posible iniciar la aplicacion, saliendo...',
      error
    );
    shutDown('SIGINT'); // Debes proporcionar una señal al método shutDown
  }
}

// Manejo de señales de apagado
process.on('SIGINT', shutDown);
process.on('SIGTERM', shutDown);

/* Inicio de la aplicacion */
startup();
