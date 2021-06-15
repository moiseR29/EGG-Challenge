import { ReferenceAccount, ReferenceAccountDAO } from '../../domain';
import { SqlManager, Sql } from '../../../../database';
import { Logger } from '../../../../utils';

const convertToCamel = (data: any): ReferenceAccount => ({
  active: data.active,
  accountId: data.account_id,
  username: data.username,
  password: data.password,
  personId: data.person_id,
  referenceAccountId: data.reference_account_id,
});

export class RefenrenceAccountDAOImpl implements ReferenceAccountDAO {
  private _sql: Sql;
  private _log: Logger;

  constructor() {
    this._sql = SqlManager.get();
    this._log = new Logger('Reference Account DAO Impl');
  }

  async create(account: ReferenceAccount): Promise<ReferenceAccount[]> {
    const query = `INSERT INTO business.reference_account ("username", "password", "person_id", "active", "account_id") VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
    this._log.info(query);
    const result = await this._sql.query(query, [
      account.username,
      account.password,
      account.personId,
      account.active,
      account.accountId,
    ]);
    return result.rows.map((v) => convertToCamel(v));
  }

  async updataPassword(account: ReferenceAccount): Promise<ReferenceAccount[]> {
    const query = `UPDATE business.reference_account set password = $1 WHERE reference_account_id = $2 RETURNING *;`;
    this._log.info(query);
    const result = await this._sql.query(query, [
      account.password,
      account.referenceAccountId!,
    ]);
    return result.rows.map((v) => convertToCamel(v));
  }

  async selectByUsername(username: string): Promise<ReferenceAccount[]> {
    const query = `SELECT * FROM business.reference_account WHERE username = $1;`;
    this._log.info(query);
    const result = await this._sql.query(query, [username]);
    return result.rows.map((v) => convertToCamel(v));
  }

  async selectByReffer(accountId: number): Promise<Array<ReferenceAccount>> {
    const query = `SELECT * FROM business.reference_account WHERE account_id = $1 LIMIT 10;`;
    this._log.info(query);
    const result = await this._sql.query(query, [accountId]);
    return result.rows.map((v) => convertToCamel(v));
  }
}
