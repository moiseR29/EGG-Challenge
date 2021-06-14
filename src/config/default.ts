import { Config } from './config';

export const DefaultConfig: Config = {
  database: {
    port: 5432,
    user: 'egg',
    password: 'password',
    database: 'challenge',
    host: 'localhost',
  },
  session: {
    salt: 10,
    secret: 'supersecretisimo',
  },
  server: {
    port: 8080,
    basePath: '/api',
  },
};
