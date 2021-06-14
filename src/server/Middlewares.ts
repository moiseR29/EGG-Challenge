import { json, urlencoded, Application } from 'express';
import { Logger } from '../utils';

export class Middlewares {
  private _app: Application;
  private _log: Logger;

  constructor(app: Application) {
    this._app = app;
    this._log = new Logger('MIDDLEWARE');
  }

  applyMiddlewares(): Application {
    this._app.use(json());
    this._log.info(`Apply JSON`);
    this._app.use(urlencoded({ extended: true }));
    this._log.info(`Apply UrlEncoded`);
    return this._app;
  }
}
