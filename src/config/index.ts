import * as dotenv from 'dotenv';
import { DefaultConfig } from './default';
import { TestConfig } from './test';
import { Config } from './config';
import { Logger } from '../utils';

dotenv.config({ path: `${__dirname.split('/build')[0]}/.env` });

const Log: Logger = new Logger('CONFIG');

enum TYPE_ENV {
  TEST = 'test',
  DEVELOP = 'develop',
  DEFAULT = 'local',
}

const env = process.env.NODE_ENV ?? TYPE_ENV.DEFAULT;

const ConfigureAccordingtoEnv = (): Config => {
  switch (env.toLowerCase()) {
    case TYPE_ENV.DEVELOP: {
      Log.info('Apply Develop Config');
      return DefaultConfig;
    }
    case TYPE_ENV.TEST: {
      Log.info('Apply Test Config');
      return TestConfig;
    }
    default: {
      Log.info('Apply Default Config');
      return DefaultConfig;
    }
  }
};

export default ConfigureAccordingtoEnv();
