import { Logger as Log4js, configure } from 'log4js';

export class Logger {
  private _log: Log4js;
  private _loggin: boolean;

  constructor(nameFile: string) {
    this._loggin = process.env.NODE_ENV !== 'test';
    this._log = configure({
      appenders: {
        out: { type: 'stdout' },
      },
      categories: {
        default: { appenders: ['out'], level: 'all' },
      },
    }).getLogger(nameFile);
  }

  info(message: any, ...params: any[]): void {
    if (this._loggin) this._log.info(message, ...params);
  }

  error(message: any, ...params: any[]): void {
    if (this._loggin) this._log.error(message, ...params);
  }

  fatal(message: any, ...params: any[]): void {
    if (this._loggin) this._log.fatal(message, ...params);
  }

  warn(message: any, ...params: any[]): void {
    if (this._loggin) this._log.warn(message, ...params);
  }

  debug(message: any, ...params: any[]): void {
    if (this._loggin) this._log.debug(message, ...params);
  }

  trace(message: any, ...params: any[]): void {
    if (this._loggin) this._log.trace(message, ...params);
  }
}
