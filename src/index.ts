import config from './config';
import { App, Router } from './server';
import { SqlManager, Psql } from './database';

const initDatabase = async () => {
  SqlManager.set(new Psql(config.database));
  await SqlManager.get().checkConnection();
};

const initServer = async () => {
  const rt = new Router();
  const server = new App();
  server.addMainRouter(rt.router);
  await server.start(config.port);
};

const main = async () => {
  await initDatabase();
  await initServer();
};

main();
