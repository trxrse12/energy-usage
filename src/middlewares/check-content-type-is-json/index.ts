import {ExtendableContext} from "koa";
import {ContentTypeIsNotJsonException} from "../../validators/errors/custom-errors";
import {TAnyPromise} from '../../utils/types';

export const checkContentTypeIsJson = async function(ctx: ExtendableContext, next: TAnyPromise){
  if (ctx.req.method! !== 'GET'
    && !ctx.req.headers['content-type']?.includes('application/json')){
    throw new ContentTypeIsNotJsonException();
  }
  await next();
};