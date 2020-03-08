import {HandlerType} from "../../../utils/types";

export const retrieveAllReadingsHandler: HandlerType = async (
  ctx, next, db: unknown, engine) => {
  try {
    console.log('WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW')
    const readings = await engine();
    console.log('QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ readings=', readings)
    ctx.body = {
      data: {message: JSON.parse(JSON.stringify(readings))},
    };
    ctx.response.status = 200;
    ctx.set('content-type', 'application/json')
  } catch (e) {
    throw e;
  }
};