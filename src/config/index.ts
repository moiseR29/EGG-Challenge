import * as dotenv from 'dotenv';
import { DefaultConfig } from './default';
import { Config } from './config';
import { Logger } from '../utils';

dotenv.config({ path: `${__dirname}/.env` });

const Log: Logger = new Logger('CONFIG');

enum TYPE_ENV {
  TEST = 'test',
  DEFAULT = 'local',
}

const env = process.env.NODE_ENV ?? TYPE_ENV.DEFAULT;

const ConfigureAccordingtoEnv = (): Config => {
  switch (env) {
    case TYPE_ENV.DEFAULT: {
      Log.info('Apply Default Config');
      return DefaultConfig;
    }
    default: {
      Log.info('Apply Default Config');
      return DefaultConfig;
    }
  }
};

export default ConfigureAccordingtoEnv();
