export interface ReferenceAccount {
  referenceAccountId?: number;
  accountId: number;
  username: string;
  password?: string;
  personId?: number;
  active: boolean;
}
