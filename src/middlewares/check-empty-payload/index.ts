import {ExtendableContext} from "koa";
import {TAnyPromise} from "../../utils/types";
import {EmptyInputException} from "../../validators/errors/custom-errors";

export const checkEmptyPayload =  async function  (ctx: ExtendableContext, next: TAnyPromise){
  if (['POST', 'PATCH', 'PUT'].includes(ctx.req.method!)
    &&  ctx.req.headers['content-length'] === '0'){
    throw new EmptyInputException();
  }
  await next();
}