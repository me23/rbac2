const RBAC = require('..');
const rules = require('./fixtures/rules');

function rbacTest(rbac) {
  const expectCheck = (done, value) => (err, res) => {
    if (err) return done(err);
    should.equal(res, value);
    return done();
  };

  it('should return true when a path is found', (done) => {
    rbac.check('admin', 'read articles', expectCheck(done, true));
  });
  it('should return false when a path is not found', (done) => {
    rbac.check('user', 'delete user', expectCheck(done, false));
  });
  it('should return false when a conditional is not satisfied', (done) => {
    rbac.check('user', 'edit article', expectCheck(done, false));
  });
  it('should return false when a conditional is not satisfied w/params', (done) => {
    rbac.check('user', 'edit article', { userId: 1 }, expectCheck(done, false));
  });
  it('should work when a callback conditional is satisfied', (done) => {
    rbac.check('user', 'edit article', { userId: 2 }, expectCheck(done, true));
  });
  it('should work an async conditional is satisfied', (done) => {
    rbac.check('user', 'delete article', { userId: 3 }, expectCheck(done, true));
  });

  it('should allow a higher node to ignore conditionals based on "checkFullPath"', (done) => {
    rbac.check('superadmin', 'delete article', expectCheck(done, !rbac.checkFullPath));
  });

  it('should propagate conditional errors from callbacks', (done) => {
    rbac.check('user', 'do nothing with callbacks', (err) => {
      should.exist(err);
      done();
    });
  });
  it('should propagate conditional errors from promises', (done) => {
    rbac.check('user', 'do nothing with promises', (err) => {
      should.exist(err);
      done();
    });
  });
}

describe('RBAC w/o caching (callbacks)', () => rbacTest(new RBAC(rules)));
describe('RBAC when checking full trees', () => rbacTest(new RBAC(rules, true, true)));
describe('RBAC w/caching (callbacks)', () => rbacTest(new RBAC(rules, false, true)));
