/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Request,
  Response,
  NextFunction,
  Router as ExpressRouter,
} from 'express';
import { HTTP_STATUS } from '../utils';
//import {} from '../utils';

export class Router {
  private _router: ExpressRouter;

  constructor() {
    this._router = ExpressRouter();
    this.configure();
  }

  get router(): ExpressRouter {
    return this._router;
  }

  private configure(): void {
    this.addHealtyEndoint();
    this.notExistsEndpoint();
  }

  private addHealtyEndoint(): void {
    this._router.get(
      '/',
      (_req: Request, res: Response, _next: NextFunction) => {
        return res
          .status(HTTP_STATUS.OK)
          .send('Welcome to EGG-Challenge Server');
      },
    );
  }

  private notExistsEndpoint(): void {
    this._router.use(
      '*',
      (_req: Request, res: Response, _next: NextFunction) => {
        return res.status(HTTP_STATUS.NOT_FOUND).send('Not Found endpoint');
      },
    );
  }
}
