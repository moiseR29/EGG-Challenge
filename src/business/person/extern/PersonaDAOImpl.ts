import { Person, PersonDAO } from '../domain';
import { SqlManager, Sql } from '../../../database';
import { Logger } from '../../../utils';

const convertToCamel = (data: any): Person => ({
  personId: data.person_id,
  name: data.name,
  lastname: data.lastname,
  dni: data.dni,
});

export class PersonaDAOImpl implements PersonDAO {
  private _sql: Sql;
  private _log: Logger;

  constructor() {
    this._sql = SqlManager.get();
    this._log = new Logger('Persona DAO Impl');
  }

  async create(person: Person): Promise<Person[]> {
    const query = `INSERT INTO business.person ("name", "lastname", "dni") VALUES ($1, $2, $3) RETURNING *;`;
    this._log.info(query);
    const result = await this._sql.query(query, [
      person.name,
      person.lastname,
      person.dni,
    ]);
    return result.rows.map((v) => convertToCamel(v));
  }

  async update(person: Person): Promise<Person[]> {
    const query = `UPDATE business.person set name = $1, lastname = $2, dni = $3 WHERE person_id = $4 RETURNING *;`;
    this._log.info(query);
    const result = await this._sql.query(query, [
      person.name,
      person.lastname,
      person.dni,
      person.personId!,
    ]);
    return result.rows.map((v) => convertToCamel(v));
  }

  async selectById(personId: number): Promise<Person[]> {
    const query = `SELECT * FROM business.person WHERE person_id = $1;`;
    this._log.info(query);
    const result = await this._sql.query(query, [personId]);
    return result.rows.map((v) => convertToCamel(v));
  }

  async selectAll(): Promise<Person[]> {
    const query = `SELECT * FROM business.person;`;
    this._log.info(query);
    const result = await this._sql.query(query, []);
    return result.rows.map((v) => convertToCamel(v));
  }

  async selectByDni(dni: string): Promise<Person[]> {
    const query = `SELECT * FROM business.person WHERE dni = $1;`;
    this._log.info(query);
    const result = await this._sql.query(query, [dni]);
    return result.rows.map((v) => convertToCamel(v));
  }
}
