import {ExtendableContext, Response} from 'koa';

export const createReading = (ctx: ExtendableContext, next: () => Promise<any>) => {
  // console.log("Request body:", JSON.stringify(ctx.request.body));
  // console.log("Context Body:", JSON.stringify(ctx.body));
  if (ctx?.request?.header['content-length'] === '0'){
    ctx.response.status = 400; // Error, BAD REQUEST
    ctx.body = {
      data: {message: 'Payload should not be empty'},
    };
    return
  }
  if (ctx.req.headers['content-length'] !== 'application/json'){
    ctx.response.status = 415; // Error, BAD REQUEST
    ctx.body = {
      data: {message: 'The Content-Type header must always be application/json'},
    };
    return
  }
  // the server responds with 200 by default
  // return ctx.body = {
  //   data: {message: 'OK'},
  // };
  ctx.response.status = 400;
  ctx.body = {
    data: {message: 'Payload should be in JSON format'}
  }
};
