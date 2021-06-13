import { Sql } from './Sql';

class SqlManager {
  private _sql!: Sql;

  set(sql: Sql) {
    this._sql = sql;
  }

  get(): Sql {
    return this._sql;
  }
}

const i: SqlManager = new SqlManager();
export { i as SqlManager };
