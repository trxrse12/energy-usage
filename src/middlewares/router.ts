import KoaRouter from 'koa-router';
const router = new KoaRouter();
import { createReading } from '../handlers/readings/create'
import koaBody from 'koa-body';

router.post('/readings', koaBody(), async (ctx, next) => {
  await createReading(ctx, next);
  await next();
});

export {
  router
};
