import { Request, Response } from 'express';
import packageJson from '../../../package.json';

export const getLivez = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok'
  });
};

export const getHealthz = (req: Request, res: Response) => {
  try {
    const { version, description } = packageJson;
    const respuesta = {
      status: 'ok',
      version,
      description
    };
    res.status(200).json(respuesta);
  } catch (error) {
    res.status(500).json({
      status: 'NOK'
    });
  }
};
