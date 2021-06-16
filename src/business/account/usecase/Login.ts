import { Account, AccountDAO } from '../domain';
import { Logger, CryptManager } from '../../../utils';
import {
  ReferenceAccountDAO,
  ReferenceAccount,
} from '../../referenceAccount/domain';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginData {
  accountDAO: AccountDAO;
  referenceAccountDAO: ReferenceAccountDAO;
  payload: LoginPayload;
}

export class Login {
  private _accountDAO: AccountDAO;
  private _payload: LoginPayload;
  private _referenceAccountDAO: ReferenceAccountDAO;
  private _log: Logger;
  private _isRefer = false;

  constructor(data: LoginData) {
    this._accountDAO = data.accountDAO;
    this._referenceAccountDAO = data.referenceAccountDAO;
    this._payload = data.payload;
    this._log = new Logger('Login Use Case');
  }

  async run(): Promise<{ token: string; message: string }> {
    let accountExists: Array<Account | ReferenceAccount> =
      await this._accountDAO.selectByUsername(this._payload.username);

    if (!accountExists.length)
      accountExists = await this.verifyIfAccountIsReferr();

    const user = accountExists[0];

    if (!(await CryptManager.compare(this._payload.password, user.password!))) {
      this._log.error(`El password es incorrecto`);
      throw new Error(`El password es incorrecto`);
    }

    delete user.password;

    return {
      token: CryptManager.generateToken({ ...user, isRefer: this._isRefer }),
      message: 'Login successfully',
    };
  }

  async verifyIfAccountIsReferr(): Promise<Array<ReferenceAccount>> {
    const accountReffer = await this._referenceAccountDAO.selectByUsername(
      this._payload.username,
    );
    if (!accountReffer.length) {
      this._log.error(
        `No se encontro cuenta con el username ${this._payload.username}`,
      );
      throw new Error(
        `No se encontro cuenta con el username ${this._payload.username}`,
      );
    }
    this._isRefer = true;
    return accountReffer;
  }
}
