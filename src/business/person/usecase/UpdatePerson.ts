/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PersonDAO, Person } from '../domain';
import { AccountDAO } from '../../account/domain';
import { Logger } from '../../../utils';

export interface UpdatePersonPayload {
  name?: string;
  lastname?: string;
  dni?: string;
  personId: number;
}

export interface UpdatePersonData {
  personaDAO: PersonDAO;
  accountDAO: AccountDAO;
  payload: UpdatePersonPayload;
  jwtData: any;
}

export class UpdatePerson {
  private _personDAO: PersonDAO;
  private _accountDAO: AccountDAO;
  private _payload: UpdatePersonPayload;
  private _jwtData: any;
  private _log: Logger;

  constructor(data: UpdatePersonData) {
    this._personDAO = data.personaDAO;
    this._accountDAO = data.accountDAO;
    this._jwtData = data.jwtData;
    this._payload = data.payload;
    this._log = new Logger('Update Person Use Case');
  }

  async run(): Promise<Person> {
    const oldPerson = await this._personDAO.selectById(this._payload.personId);

    if (!oldPerson.length) {
      this._log.error('Person Not Exists');
      throw new Error('Person Not Exists');
    }

    const account = await this._accountDAO.selectByUsername(
      this._jwtData.username,
    );

    if (account[0].personId! !== oldPerson[0].personId) {
      this._log.error('Not have permission');
      throw new Error('Not have permission');
    }

    const newPerson: Person = {
      ...oldPerson[0],
      ...this._payload,
    };

    return (await this._personDAO.update(newPerson))[0];
  }
}
