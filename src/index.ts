import config from './config';
import { App, Router, Middlewares } from './server';
import { SqlManager, Psql } from './database';

export const setDatabase = () => {
  SqlManager.set(new Psql(config.database));
};

export const preparedServer = (): App => {
  const server = new App();
  server.addServerMiddlewares(new Middlewares(server.app));
  server.addMainRouter(new Router().router);
  return server;
};

const main = async () => {
  setDatabase();
  try {
    await SqlManager.get().checkConnection();
  } catch (error) {
    if (config.server.env === 'compose') {
      await new Promise((resolve) => setTimeout(resolve, 10));
      try {
        await SqlManager.get().checkConnection();
      } catch (error) {}
    }
  }

  await preparedServer().start(config.server.port);
};

main();
