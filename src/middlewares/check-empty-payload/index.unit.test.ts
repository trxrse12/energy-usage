// import {expect} from 'chai';
// import {SinonSpy, spy} from 'sinon';
// import assert, {deepStrictEqual} from 'assert';
// import {checkEmptyPayload} from '.';
// import {ExtendableContext, Request, Response} from "koa";
// import {TAnyPromise} from "../../utils/types";
// import deepClone from 'lodash.clonedeep'
//
// let next = spy();
//
// describe('checkEmptyPayload', () => {
//   let ctx: ExtendableContext;
//   let req: Request;
//   let res: Response;
//   let next: TAnyPromise;
//
//   describe('When req.method is not one of POST, PATCH or PUT', () => {
//     let clonedRes: Response;
//     beforeEach(function (){
//       req = {method: 'GET'} as unknown as Request;
//       res = {} as unknown as Response;
//       next = spy() as unknown as TAnyPromise;
//       clonedRes = deepClone(res);
//       checkEmptyPayload(ctx, next);
//     });
//     it('should not modify res', () => {
//       assert(deepStrictEqual(res, clonedRes))
//     });
    // it('should call next() once', () => {
    //   assert(next.calledOnce)
    // });
  // });

  // (['POST', 'PATCH', 'PUT']).forEach((method) => {
  //   describe(`When req.method is ${method}`, () => {
  //     describe('and the content-length header is not "0"', () => {
  //       let clonedRes: Response;
  //       beforeEach(() => {
  //         req = {
  //           method,
  //           headers: {
  //             'content-length': '1',
  //           },
  //         } as unknown as Request;
  //         res = {} as unknown as Response;
  //         next = spy();
  //         clonedRes = deepClone(res);
  //         checkEmptyPayload(ctx, next);
  //       });
  //       it('should not modify res', () => {
  //         assert(deepStrictEqual(res, clonedRes));
  //       });
  //       it('should call next()', () => {
  //         assert(next.calledOnce);
  //       })
  //     });
      // describe('when the content-length is "0"', () => {
      //   let resJsonReturnValue: unknown;
      //   beforeEach(() => {
      //     req = {
      //       method,
      //       headers: {
      //         'content-length': 0,
      //       }
      //     }as unknown as Request;
      //     resJsonReturnValue = {};
      //     res = {
      //       status: spy(),
      //       set: spy(),
      //       json: spy(),
      //     };
      //     next = spy();
      //     checkEmptyPayload(ctx, next);
      //   });
      //   describe('should call res.status()', () => {
      //     it('once', () => {
      //       assert(res.status.calledOnce)
      //     });
      //     it('with the argument 400', () => {
      //       assert(res.status.calledWithExactly(400))
      //     });
      //   });
      //   describe('should call res.set()', () => {
      //     it('once', () => {
      //       assert(res.set.calledWithExactly('Content-Type','application/json'));
      //     });
      //   });
      //   describe('should call res.json()', () => {
      //     it('once', () => {
      //       assert(res.json.calledOnce)
      //     });
      //     it('with the correct error object', () => {
      //       assert(res.json.calledWithExactly({message: 'Payload should not be empty'}))
      //     });
      //   });
      //   it('should not call next()', () => {
      //     assert(next.notCalled);
      //   });
      // });
    // });
  // })
// });
