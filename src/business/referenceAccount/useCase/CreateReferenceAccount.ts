import { ReferenceAccountDAO, ReferenceAccount } from '../domain';
import { PersonDAO } from '../../person/domain';
import { AccountDAO } from '../../account/domain';
import { Logger, CryptManager, TokenData } from '../../../utils';

export interface CreateAccountPayload {
  name: string;
  lastname: string;
  dni: string;
  username: string;
  password: string;
}

export interface CreateReferenceAccountData {
  referenceAccountDAO: ReferenceAccountDAO;
  accountDAO: AccountDAO;
  personaDAO: PersonDAO;
  payload: CreateAccountPayload;
  tokenData: TokenData;
}

export class CreateReferenceAccount {
  private _accountDAO: AccountDAO;
  private _personDAO: PersonDAO;
  private _payload: CreateAccountPayload;
  private _referenceAccountDAO: ReferenceAccountDAO;
  private _tokenData: TokenData;
  private _log: Logger;

  constructor(data: CreateReferenceAccountData) {
    this._referenceAccountDAO = data.referenceAccountDAO;
    this._accountDAO = data.accountDAO;
    this._personDAO = data.personaDAO;
    this._payload = data.payload;
    this._tokenData = data.tokenData;
    this._log = new Logger('Create Account Use Case');
  }

  async run(): Promise<ReferenceAccount> {
    const personExists = await this._personDAO.selectByDni(this._payload.dni);

    if (personExists.length) {
      this._log.error('La Persona ya existe');
      throw new Error('La Persona ya existe');
    }

    const account = await this._accountDAO.selectById(
      this._tokenData.accountId!,
    );

    if (!account.length) {
      this._log.error('La Cuenta no existe');
      throw new Error('La Cuenta no existe');
    }

    const personCreated = await this._personDAO.create({
      name: this._payload.name,
      lastname: this._payload.lastname,
      dni: this._payload.dni,
    });
    this._log.info('Person Created');

    const passwordCrypt = await CryptManager.hash(this._payload.password);

    const accountReferenceCreated = await this._referenceAccountDAO.create({
      accountId: this._tokenData.accountId!,
      username: this._payload.username,
      password: passwordCrypt,
      personId: personCreated[0].personId!,
      active: true,
    });
    this._log.info('Account Created');

    const response = accountReferenceCreated[0];
    delete response.password;

    return response;
  }
}
