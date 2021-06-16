import { Config } from './config';

export const TestConfig: Config = {
  database: {
    port: 5432,
    user: 'egg',
    password: 'password',
    database: 'test',
    host: 'localhost',
  },
  session: {
    salt: 10,
    secret: 'supersecretisimo',
  },
  server: {
    port: 8080,
    basePath: '/api',
    env: 'test',
  },
};
