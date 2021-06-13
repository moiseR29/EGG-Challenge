import { App, Router } from './server';

const PORT = 8080;

const main = async () => {
  const rt = new Router();
  const server = new App();
  server.addMainRouter(rt.router);
  await server.start(PORT);
};

main();
