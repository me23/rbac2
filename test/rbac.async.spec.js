const RBAC = require('..');
const rules = require('./fixtures/rules');

describe('RBAC', () => {
  let rbac;

  describe('w/o caching (promises/async/await)', () => {
    before(() => {
      rbac = new RBAC(rules);
    });

    it('should return true when a path is found', async () => {
      const result = await rbac.check('admin', 'read articles');
      should.equal(result, true);
    });

    it('should return false when a path is not found', async () => {
      const result = await rbac.check('user', 'delete user');
      should.equal(result, false);
    });

    it('should return false when a conditional is not satisfied', async () => {
      const result = await rbac.check('user', 'edit article');
      should.equal(result, false);
    });

    it('should return false when a conditional is not satisfied w/params', async () => {
      const result = await rbac.check('user', 'edit article', { userId: 1 });
      should.equal(result, false);
    });

    it('should work when a callback conditional is satisfied', async () => {
      const result = await rbac.check('user', 'edit article', { userId: 2 });
      should.equal(result, true);
    });

    it('should work an async conditional is satisfied', async () => {
      const result = await rbac.check('user', 'delete article', { userId: 3 });
      should.equal(result, true);
    });

    it('should allow a higher node to ignore conditionals based on "checkFullPath"', async () => {
      const result = await rbac.check('superadmin', 'delete article');
      should.equal(result, !rbac.checkFullPath);
    });

    it('should propagate conditional errors from callbacks', async () => {
      try {
        await rbac.check('user', 'do nothing with callbacks');
      } catch (err) {
        should.exist(err);
      }
    });

    it('should propagate conditional errors from promises', async () => {
      try {
        await rbac.check('user', 'do nothing with promises');
      } catch (err) {
        should.exist(err);
      }
    });
  });

  describe('when checking full trees (promises/async/await)', () => {
    before(() => {
      rbac = new RBAC(rules, true, true);
    });

    it('should return true when a path is found', async () => {
      const result = await rbac.check('admin', 'read articles');
      should.equal(result, true);
    });

    it('should return false when a path is not found', async () => {
      const result = await rbac.check('user', 'delete user');
      should.equal(result, false);
    });

    it('should return false when a conditional is not satisfied', async () => {
      const result = await rbac.check('user', 'edit article');
      should.equal(result, false);
    });

    it('should return false when a conditional is not satisfied w/params', async () => {
      const result = await rbac.check('user', 'edit article', { userId: 1 });
      should.equal(result, false);
    });

    it('should work when a callback conditional is satisfied', async () => {
      const result = await rbac.check('user', 'edit article', { userId: 2 });
      should.equal(result, true);
    });

    it('should work an async conditional is satisfied', async () => {
      const result = await rbac.check('user', 'delete article', { userId: 3 });
      should.equal(result, true);
    });

    it('should allow a higher node to ignore conditionals based on "checkFullPath"', async () => {
      const result = await rbac.check('superadmin', 'delete article');
      should.equal(result, !rbac.checkFullPath);
    });

    it('should propagate conditional errors from callbacks', async () => {
      try {
        await rbac.check('user', 'do nothing with callbacks');
      } catch (err) {
        should.exist(err);
      }
    });

    it('should propagate conditional errors from promises', async () => {
      try {
        await rbac.check('user', 'do nothing with promises');
      } catch (err) {
        should.exist(err);
      }
    });
  });

  describe('w/caching (promises/async/await)', () => {
    before(() => {
      rbac = new RBAC(rules, false, true);
    });

    it('should return true when a path is found', async () => {
      const result = await rbac.check('admin', 'read articles');
      should.equal(result, true);
    });

    it('should return false when a path is not found', async () => {
      const result = await rbac.check('user', 'delete user');
      should.equal(result, false);
    });

    it('should return false when a conditional is not satisfied', async () => {
      const result = await rbac.check('user', 'edit article');
      should.equal(result, false);
    });

    it('should return false when a conditional is not satisfied w/params', async () => {
      const result = await rbac.check('user', 'edit article', { userId: 1 });
      should.equal(result, false);
    });

    it('should work when a callback conditional is satisfied', async () => {
      const result = await rbac.check('user', 'edit article', { userId: 2 });
      should.equal(result, true);
    });

    it('should work an async conditional is satisfied', async () => {
      const result = await rbac.check('user', 'delete article', { userId: 3 });
      should.equal(result, true);
    });

    it('should allow a higher node to ignore conditionals based on "checkFullPath"', async () => {
      const result = await rbac.check('superadmin', 'delete article');
      should.equal(result, !rbac.checkFullPath);
    });

    it('should propagate conditional errors from callbacks', async () => {
      try {
        await rbac.check('user', 'do nothing with callbacks');
      } catch (err) {
        should.exist(err);
      }
    });

    it('should propagate conditional errors from promises', async () => {
      try {
        await rbac.check('user', 'do nothing with promises');
      } catch (err) {
        should.exist(err);
      }
    });
  });
});
