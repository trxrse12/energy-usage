import {ExtendableContext, Response} from 'koa';

export const createReading = (ctx: ExtendableContext, next: () => Promise<any>) => {
  if (!ctx?.body){
      ctx.response.status = 400; // Error, BAD REQUEST
      ctx.body = {
        data: {message: 'Payload should not be empty'},
      };
      return
  }
  // the server responds with 200 by default
  return ctx.body = {
    data: {message: 'OK'},
  };
};
