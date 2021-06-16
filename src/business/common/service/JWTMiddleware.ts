import { Request, Response, NextFunction } from 'express';
import {
  CryptManager,
  TOKEN_EGG_HEADER,
  HTTP_STATUS,
  Logger,
} from '../../../utils';

export class JWTMiddleware {
  jwt(req: Request, res: Response, next: NextFunction) {
    const Log: Logger = new Logger('JWT MIDD');
    try {
      const token = req.get(TOKEN_EGG_HEADER);

      if (!token) {
        Log.error(`Token not exists`);
        return res
          .status(HTTP_STATUS.UNAUTHORIZED)
          .send({ message: 'You don´t have permissions' });
      }

      req.body.tokenData = CryptManager.verifyToken(token);

      next();
    } catch (error) {
      Log.error(`Invalid Token`);
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .send({ message: error.message });
    }
  }
}
