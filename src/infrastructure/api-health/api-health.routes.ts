import { Router } from 'express';
import { getHealthz, getLivez } from './api-health.controller';

const app = Router();

app.get('/livez', getLivez);

app.get('/healthz', getHealthz);

export default app;
