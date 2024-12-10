import { Request, Response, NextFunction } from 'express';
import { ErrorManagement, CustomError } from '../../utils/errorManagement';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError: CustomError;
  if (err instanceof Error) {
    customError = ErrorManagement(
      500,
      err.message,
      'Ocurrió un error en el servidor'
    );
  } else {
    customError = ErrorManagement(
      500,
      'Ocurrió un error desconocido',
      'Por favor revisa los registros de consola para más detalles'
    );
  }
  res.status(customError.status).json({ error: customError.message });
};
