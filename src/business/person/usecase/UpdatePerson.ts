/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PersonDAO, Person } from '../domain';
import { Account, AccountDAO } from '../../account/domain';
import {
  ReferenceAccountDAO,
  ReferenceAccount,
} from '../../referenceAccount/domain';
import { Logger, TokenData } from '../../../utils';

export interface UpdatePersonPayload {
  name?: string;
  lastname?: string;
  dni?: string;
  personId: number;
}

export interface UpdatePersonData {
  personaDAO: PersonDAO;
  accountDAO: AccountDAO;
  referenceAccountDAO: ReferenceAccountDAO;
  payload: UpdatePersonPayload;
  tokenData: any;
}

export class UpdatePerson {
  private _personDAO: PersonDAO;
  private _accountDAO: AccountDAO;
  private _referenceAccountDAO: ReferenceAccountDAO;
  private _payload: UpdatePersonPayload;
  private _tokenData: TokenData;
  private _log: Logger;

  constructor(data: UpdatePersonData) {
    this._personDAO = data.personaDAO;
    this._accountDAO = data.accountDAO;
    this._referenceAccountDAO = data.referenceAccountDAO;
    this._tokenData = data.tokenData;
    this._payload = data.payload;
    this._log = new Logger('Update Person Use Case');
  }

  async run(): Promise<Person> {
    const oldPerson = await this._personDAO.selectById(this._payload.personId);

    if (!oldPerson.length) {
      this._log.error('Person Not Exists');
      throw new Error('Person Not Exists');
    }

    const account = await this.getAccountToken();

    if (
      account[0].personId! !== oldPerson[0].personId &&
      !this.verifyAccoutIsReffered()
    ) {
      this._log.error('Not have permission');
      throw new Error('Not have permission');
    }

    const newPerson: Person = {
      ...oldPerson[0],
      ...this._payload,
    };

    return (await this._personDAO.update(newPerson))[0];
  }

  private async verifyAccoutIsReffered(): Promise<boolean> {
    return !!(
      await this._referenceAccountDAO.selectByReffer(this._tokenData.accountId!)
    ).length;
  }

  private async getAccountToken(): Promise<Array<Account | ReferenceAccount>> {
    let account: Array<Account | ReferenceAccount>;
    if (this._tokenData.isRefer) {
      account = await this._referenceAccountDAO.selectByUsername(
        this._tokenData.username,
      );
    } else {
      account = await this._accountDAO.selectByUsername(
        this._tokenData.username,
      );
    }
    return account;
  }
}
