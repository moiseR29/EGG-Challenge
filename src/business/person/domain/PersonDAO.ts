import { Person } from './Person';

export interface PersonDAO {
  create(person: Person): Promise<Array<Person>>;
  update(person: Person): Promise<Array<Person>>;
  selectById(personId: number): Promise<Array<Person>>;
  selectAll(): Promise<Array<Person>>;
  selectByDni(dni: string): Promise<Array<Person>>;
}
