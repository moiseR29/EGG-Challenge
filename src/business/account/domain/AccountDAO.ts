import { Account } from './Account';

export interface AccountDAO {
  create(account: Account): Promise<Array<Account>>;
  updataPassword(account: Account): Promise<Array<Account>>;
  selectById(accountId: number): Promise<Array<Account>>;
  selectAll(): Promise<Array<Account>>;
  selectByUsername(username: string): Promise<Array<Account>>;
}
