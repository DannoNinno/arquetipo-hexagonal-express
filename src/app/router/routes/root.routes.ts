import express, { Request, Response } from 'express';
// AQUI DEBERIAN IR IMPORTADOS LOS CONTROLADORES

const rootRouter = express.Router();
const fs = require('fs');
const path = require('path');

rootRouter.get('/', (_req: Request, res: Response) => {
  const jsonPath = path.join(__dirname, '../../../../package.json');
  let packageJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const nombre = packageJson.name;
  const version = packageJson.version;
  packageJson = null;
  res.send(
    '<h3>El Servicio: [' +
      nombre +
      '] esta en linea.</h3><h4>Version: ' +
      version +
      '</h4>'
  );
});
rootRouter.get('/prueba', async (_req: Request, res: Response) => {
  // AQUI PUEDE IR CUALQUIER METODO PARA PRUEBAS

  res.send('Prueba de microservicio exitosa');
});
export default rootRouter;
