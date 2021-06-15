import { hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import config from '../config';
import { Logger } from './Logger';

export interface TokenData {
  accountId?: number;
  username: string;
  personId?: number;
  isRefer: boolean;
}

class CryptManager {
  async hash(label: string): Promise<string> {
    return await hash(label, config.session.salt);
  }

  async compare(labelToCompare: string, hash: string): Promise<boolean> {
    return await compare(labelToCompare, hash);
  }

  generateToken(data: TokenData): string {
    return sign(data, config.session.secret, { expiresIn: 60 * 60 });
  }

  verifyToken(token: string): TokenData {
    const Log: Logger = new Logger('JWT');
    try {
      return <TokenData>verify(token, config.session.secret);
    } catch (error) {
      Log.error(error.message);
      throw new Error(error.message);
    }
  }
}

const i: CryptManager = new CryptManager();
export { i as CryptManager };
