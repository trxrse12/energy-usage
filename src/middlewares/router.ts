import KoaRouter from 'koa-router';
const router = new KoaRouter();
import { createReading } from '../handlers/readings/create'
import koaBody from 'koa-body';

router.post('/readings', koaBody(), (ctx, next) => {
  createReading(ctx, next);
  next();
});

export {
  router
};
