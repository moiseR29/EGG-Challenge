import { json, urlencoded, Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { Logger } from '../utils';

export class Middlewares {
  private _app: Application;
  private _log: Logger;

  constructor(app: Application) {
    this._app = app;
    this._log = new Logger('MIDDLEWARE');
  }

  applyMiddlewares(): Application {
    this._app.use(helmet());
    this._log.info(`Apply Helmet`);
    this._app.use(cors(this.configCors()));
    this._log.info(`Apply Cors`);
    this._app.use(json());
    this._log.info(`Apply JSON`);
    this._app.use(urlencoded({ extended: true }));
    this._log.info(`Apply UrlEncoded`);
    return this._app;
  }

  private configCors(): cors.CorsOptions {
    return {
      allowedHeaders: ['Origin', 'x-egg-token'],
      // TODO case production or microservice origin: ['domain'],
      origin: '*',
      methods: 'GET,OPTIONS,PUT,POST,DELETE',
    };
  }
}
