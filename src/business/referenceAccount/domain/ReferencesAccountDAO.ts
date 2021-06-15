import { ReferenceAccount } from './ReferenceAccount';

export interface ReferenceAccountDAO {
  create(account: ReferenceAccount): Promise<Array<ReferenceAccount>>;
  updataPassword(account: ReferenceAccount): Promise<Array<ReferenceAccount>>;
  selectByReffer(accountId: number): Promise<Array<ReferenceAccount>>;
  selectByUsername(username: string): Promise<Array<ReferenceAccount>>;
}
