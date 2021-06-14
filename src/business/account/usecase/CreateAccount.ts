/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AccountDAO, Account } from '../domain';
import { PersonDAO } from '../../person/domain';
import { Logger } from '../../../utils';

export interface CreateAccountPayload {
  name: string;
  lastname: string;
  dni: string;
  username: string;
  password: string;
}

export interface CreateAccountData {
  accountDAO: AccountDAO;
  personaDAO: PersonDAO;
  payload: CreateAccountPayload;
}

export class CreateAccount {
  private _accountDAO: AccountDAO;
  private _personDAO: PersonDAO;
  private _payload: CreateAccountPayload;
  private _log: Logger;

  constructor(data: CreateAccountData) {
    this._accountDAO = data.accountDAO;
    this._personDAO = data.personaDAO;
    this._payload = data.payload;
    this._log = new Logger('Create Account Use Case');
  }

  async run(): Promise<Account> {
    const personExists = await this._personDAO.selectByDni(this._payload.dni);

    if (personExists.length) {
      this._log.error('La Persona ya existe');
      throw new Error('La Persona ya existe');
    }

    const personCreated = await this._personDAO.create({
      name: this._payload.name,
      lastname: this._payload.lastname,
      dni: this._payload.dni,
    });
    this._log.info('Person Created');

    // TODO add crypt password
    const accountCreated = await this._accountDAO.create({
      username: this._payload.username,
      password: this._payload.password,
      personId: personCreated[0].personId!,
    });
    this._log.info('Account Created');

    return accountCreated[0];
  }
}
