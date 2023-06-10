const RBAC = require('..');
const rules = require('./fixtures/rules');

function rbacTestPromise(rbac) {
  it('should return true when a path is found',
    async () => rbac.check('admin', 'read articles').should.eventually.equal(true));
  it('should return false when a path is not found',
    async () => rbac.check('user', 'delete user').should.eventually.equal(false));
  it('should return false when a conditional is not satisfied',
    async () => rbac.check('user', 'edit article').should.eventually.equal(false));
  it('should return false when a conditional is not satisfied',
    async () => rbac.check('user', 'edit article', { userId: 1 }).should.eventually.equal(false));
  it('should work when a callback conditional is satisfied',
    async () => rbac.check('user', 'edit article', { userId: 2 }).should.eventually.equal(true));
  it('should work an async conditional is satisfied',
    async () => rbac.check('user', 'delete article', { userId: 3 }).should.eventually.equal(true));

  it('should allow a higher node to ignore conditionals based on "checkFullPath"',
    async () => rbac.check('superadmin', 'delete article').should.eventually.equal(!rbac.checkFullPath));

  it('should propagate conditional errors from callbacks',
    async () => rbac.check('user', 'do nothing with callbacks').should.eventually.be.rejected);
  it('should propagate conditional errors from promises',
    async () => rbac.check('user', 'do nothing with promises').should.eventually.be.rejected);
}


describe('RBAC w/o caching (promises/async/await)', () => rbacTestPromise(new RBAC(rules)));
describe('RBAC when checking full trees (promises/async/await)', () => rbacTestPromise(new RBAC(rules, true, true)));
describe('RBAC w/caching (promises/async/await)', () => rbacTestPromise(new RBAC(rules, false, true)));
