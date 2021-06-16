import { Config } from './config';
import * as dotenv from 'dotenv';

dotenv.config({ path: `${__dirname.split('/build')[0]}/.env` });

export const DefaultConfig: Config = {
  database: {
    port: 5432,
    user: 'egg',
    password: 'password',
    database: 'challenge',
    // TODO in case use docker-compose, change this for postgres
    host: process.env.DB_HOST ?? 'localhost',
  },
  session: {
    salt: 10,
    secret: 'supersecretisimo',
  },
  server: {
    port: 8080,
    basePath: '/api',
    env: 'develop',
    log: true,
    accessToken: 'egg',
  },
};
