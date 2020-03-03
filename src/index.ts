import Koa from 'koa';

import { initialize } from './data'; // init the db
import { router } from './middlewares/router'

const PORT = process.env.PORT || 3000;

export default function createServer() {
  const server = new Koa();

  server.use(router.allowedMethods());
  server.use(router.routes());
  return server;
}

if (!module.parent) {
  initialize();
  const server = createServer();
  server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
  });
}
