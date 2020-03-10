import {HandlerType} from "../../../utils/types";

export const retrieveUsageHandler: HandlerType = async (
  ctx, next, db: unknown, engine) => {
  try {
    const usage = await engine();
    console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT in handler: usage=', usage)
    ctx.body = {
      data: {message: JSON.parse(JSON.stringify(usage))},
    };
    ctx.response.status = 200;
    ctx.set('content-type', 'application/json')
  } catch (e) {
    throw e;
  }
};