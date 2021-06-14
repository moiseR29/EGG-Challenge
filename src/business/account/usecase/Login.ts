import { AccountDAO } from '../domain';
import { Logger } from '../../../utils';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginData {
  accountDAO: AccountDAO;
  payload: LoginPayload;
}

export class Login {
  private _accountDAO: AccountDAO;
  private _payload: LoginPayload;
  private _log: Logger;

  constructor(data: LoginData) {
    this._accountDAO = data.accountDAO;
    this._payload = data.payload;
    this._log = new Logger('Login Use Case');
  }

  async run(): Promise<{ token: string; message: string }> {
    const accountExists = await this._accountDAO.selectByUsername(
      this._payload.username,
    );

    if (!accountExists.length) {
      this._log.error(
        `No se encontro cuenta con el username ${this._payload.username}`,
      );
      throw new Error(
        `No se encontro cuenta con el username ${this._payload.username}`,
      );
    }

    // TODO check password
    if (this._payload.password !== accountExists[0].password) {
      this._log.error(`El password es incorrecto`);
      throw new Error(`El password es incorrecto`);
    }

    return {
      token: 'token',
      message: 'Login successfully',
    };
  }
}
