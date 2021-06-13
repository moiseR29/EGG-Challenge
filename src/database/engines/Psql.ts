import { Pool, PoolClient, PoolConfig } from 'pg';
import { Logger } from '../../utils';
import { Sql, ResultQuery } from '../Sql';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PsqlConfig extends PoolConfig {}

export class Psql implements Sql {
  private _config: PsqlConfig;
  private _pool: Pool;
  private _log: Logger;

  constructor(config: PsqlConfig) {
    this._config = config;
    this._log = new Logger('PSQL');
    this._pool = new Pool({ ...this._config });
  }

  async checkConnection(): Promise<void> {
    try {
      await this.query(`SELECT 1`, []);
      this._log.info(`Psql Connection Successfully`);
    } catch (error) {
      this._log.error(`Psql Connecction error config: ${this._config}`);
      throw new Error(error);
    }
  }

  async query(query: string, values: any[]): Promise<ResultQuery> {
    const client: PoolClient = await this.getConnection();
    const queryResponse: ResultQuery = {
      rowCount: 0,
      rows: [],
    };

    try {
      const result = await client.query(query, values);
      queryResponse.rowCount = result.rowCount;
      queryResponse.rows = result.rows;
    } catch (e) {
      this._log.error(e);
      throw new Error(e);
    } finally {
      client.release();
    }

    return queryResponse;
  }

  private async getConnection(): Promise<PoolClient> {
    if (!this._config) throw new Error('Postgres Configure not Found');
    return await this._pool.connect();
  }
}
