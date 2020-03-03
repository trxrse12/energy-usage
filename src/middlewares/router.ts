import KoaRouter from 'koa-router';
const router = new KoaRouter();
import { createReading } from '../handlers/readings/create'

router.post('/readings', (ctx, next) => {
  createReading(ctx, next);
  next();
});

export {
  router
};
