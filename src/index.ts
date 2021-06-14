import config from './config';
import { App, Router, Middlewares } from './server';
import { SqlManager, Psql } from './database';

const initDatabase = async () => {
  SqlManager.set(new Psql(config.database));
  await SqlManager.get().checkConnection();
};

const initServer = async () => {
  const server = new App();
  server.addServerMiddlewares(new Middlewares(server.app));
  server.addMainRouter(new Router().router);
  await server.start(config.server.port);
};

const main = async () => {
  await initDatabase();
  await initServer();
};

main();
