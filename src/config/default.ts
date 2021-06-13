import { Config } from './config';

export const DefaultConfig: Config = {
  database: {
    port: 5432,
    user: 'egg',
    password: 'password',
    database: 'challenge',
    host: 'localhost',
  },
  port: 8080,
};
