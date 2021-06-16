import { Request, Response, NextFunction } from 'express';
import config from '../../../config';
import {
  CryptManager,
  TOKEN_ACCESS_HEADER,
  HTTP_STATUS,
  Logger,
} from '../../../utils';

export class AccessTokenMiddleware {
  accessToken(req: Request, res: Response, next: NextFunction) {
    const Log: Logger = new Logger('Token Access MIDD');
    try {
      const token = req.get(TOKEN_ACCESS_HEADER);

      if (!token) {
        Log.error(`Token not exists`);
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .send({ message: 'You need Token' });
      }

      if (!CryptManager.compare(token, config.server.accessToken))
        return res
          .status(HTTP_STATUS.UNAUTHORIZED)
          .send({ message: 'Incorrect Token' });

      next();
    } catch (error) {
      Log.error(`Invalid Token`);
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .send({ message: error.message });
    }
  }
}
