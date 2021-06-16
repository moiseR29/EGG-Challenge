import { ReferenceAccountDAO, ReferenceAccount } from '../domain';
import { Logger, TokenData } from '../../../utils';

export interface GetReferenceAccountData {
  referenceAccountDAO: ReferenceAccountDAO;
  tokenData: TokenData;
}

export class GetReferenceAccount {
  private _referenceAccountDAO: ReferenceAccountDAO;
  private _tokenData: TokenData;
  private _log: Logger;

  constructor(data: GetReferenceAccountData) {
    this._referenceAccountDAO = data.referenceAccountDAO;
    this._tokenData = data.tokenData;
    this._log = new Logger('Create Account Use Case');
  }

  async run(): Promise<Array<ReferenceAccount>> {
    this._log.info('Get References Accout');
    if (this._tokenData.isRefer) {
      this._log.error(`Your account isn´t a referrer`);
      throw new Error(`Your account isn´t a referrer`);
    }
    return (
      await this._referenceAccountDAO.selectByReffer(this._tokenData.accountId!)
    ).map((v: ReferenceAccount) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = v;
      return rest;
    });
  }
}
