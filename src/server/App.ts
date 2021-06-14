import express, { Application, Router } from 'express';
import { Logger } from '../utils';
import { Middlewares } from './Middlewares';

export class App {
  private _app: Application;
  private _log: Logger;

  constructor() {
    this._app = express();
    this._log = new Logger('APP');
  }

  get app(): Application {
    return this._app;
  }

  addServerMiddlewares(midd: Middlewares) {
    this._app = midd.applyMiddlewares();
  }

  addMainRouter(router: Router) {
    this._app.use(router);
  }

  async start(port: number): Promise<void> {
    this.app.listen(port);
    this._log.info(`Server Running on port: ${port}`);
  }
}
