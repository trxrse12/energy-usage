import {ExtendableContext} from "koa";
import {TAnyPromise} from "../utils/types";
import {ContentTypeNotSetException} from "../validators/errors/custom-errors";

export const checkContentTypeIsSet = async function (ctx: ExtendableContext, next: TAnyPromise){
  if (
    ctx.req.headers['content-length']
    && ctx.req.headers['content-length'] !== '0'
    && !ctx.req?.headers['content-type']
  ) {
    throw new ContentTypeNotSetException();
  }
  await next();
};