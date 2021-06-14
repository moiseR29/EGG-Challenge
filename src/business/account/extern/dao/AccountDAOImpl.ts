import { Account, AccountDAO } from '../../domain';
import { SqlManager, Sql } from '../../../../database';
import { Logger } from '../../../../utils';

const convertToCamel = (data: any): Account => ({
  accountId: data.account_id,
  username: data.username,
  password: data.password,
  personId: data.person_id,
});

export class AccountDAOImpl implements AccountDAO {
  private _sql: Sql;
  private _log: Logger;

  constructor() {
    this._sql = SqlManager.get();
    this._log = new Logger('Persona DAO Impl');
  }

  async create(account: Account): Promise<Account[]> {
    const query = `INSERT INTO business.account ("username", "password", "person_id") VALUES ($1, $2, $3) RETURNING *;`;
    this._log.info(query);
    const result = await this._sql.query(query, [
      account.username,
      account.password,
      account.personId,
    ]);
    return result.rows.map((v) => convertToCamel(v));
  }

  async updataPassword(account: Account): Promise<Account[]> {
    const query = `UPDATE business.account set password = $1 WHERE account_id = $2 RETURNING *;`;
    this._log.info(query);
    const result = await this._sql.query(query, [
      account.password,
      account.accountId,
    ]);
    return result.rows.map((v) => convertToCamel(v));
  }

  async selectById(accountId: number): Promise<Account[]> {
    const query = `SELECT * FROM business.account WHERE account_id = $1`;
    this._log.info(query);
    const result = await this._sql.query(query, [accountId]);
    return result.rows.map((v) => convertToCamel(v));
  }

  async selectAll(): Promise<Account[]> {
    const query = `SELECT * FROM business.account`;
    this._log.info(query);
    const result = await this._sql.query(query, []);
    return result.rows.map((v) => convertToCamel(v));
  }

  async selectByUsername(username: string): Promise<Account[]> {
    const query = `SELECT * FROM business.account WHERE username = $1`;
    this._log.info(query);
    const result = await this._sql.query(query, [username]);
    return result.rows.map((v) => convertToCamel(v));
  }
}
