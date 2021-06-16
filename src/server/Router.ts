/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Request,
  Response,
  NextFunction,
  Router as ExpressRouter,
} from 'express';
import { HTTP_STATUS } from '../utils';
import config from '../config';
import { AccountController } from '../business/account/extern';
import { PersonController } from '../business/person/extern';
import { ReferenceAccountController } from '../business/referenceAccount/extern';
import { AccessTokenMiddleware } from '../business/common/service';

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
    this.applyEndpoint();
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

  private applyEndpoint(): void {
    let businessRouter: ExpressRouter = new AccountController(this._router)
      .router;
    businessRouter = new PersonController(this.router).router;
    businessRouter = new ReferenceAccountController(this._router).router;
    this._router.use(
      config.server.basePath,
      [new AccessTokenMiddleware().accessToken],
      businessRouter,
    );
  }

  private notExistsEndpoint(): void {
    this._router.use(
      '*',
      [new AccessTokenMiddleware().accessToken],
      (_req: Request, res: Response, _next: NextFunction) => {
        return res.status(HTTP_STATUS.NOT_FOUND).send('Not Found endpoint');
      },
    );
  }
}
