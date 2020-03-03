import {ExtendableContext, Response} from 'koa';

export const createReading = (ctx: ExtendableContext, next: () => Promise<any>) => {
  console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBB ctx.body', ctx.body)
  if (!ctx?.body){
      ctx.body = {
        status: 400,
        data: {message: 'Payload should not be empty'},
      };
      return
  }
  // the server responds with 200
  //ctx.set('Content-Type','text/plain');
  return ctx.body = {
    status: 200,
    data: {message: 'OK'},
  };
};
