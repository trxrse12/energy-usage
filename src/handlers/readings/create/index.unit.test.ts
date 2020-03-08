import sinon from 'sinon';
import {createReadingHandler} from ".";

const engineStub = {
  success: () => sinon.stub().resolves(true)
};

describe('createReadingHandler', () => {
  describe('when called with valid context object', () => {
    // expect(createReadingHandler(ctx, next, engineStub().success, validatorStub.success())).to.eventually.be()
  });
});
