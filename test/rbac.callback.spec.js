const RBAC = require('..');
const rules = require('./fixtures/rules');

describe('RBAC', () => {
  let rbac;

  describe('w/o caching (callbacks)', () => {
    before(() => {
      rbac = new RBAC(rules);
    });

    it('should return true when a path is found', (done) => {
      rbac.check('admin', 'read articles', (err, res) => {
        if (err) return done(err);
        should.equal(res, true);
        return done();
      });
    });

    it('should return false when a path is not found', (done) => {
      rbac.check('user', 'delete user', (err, res) => {
        if (err) return done(err);
        should.equal(res, false);
        return done();
      });
    });

    it('should return false when a conditional is not satisfied', (done) => {
      rbac.check('user', 'edit article', (err, res) => {
        if (err) return done(err);
        should.equal(res, false);
        return done();
      });
    });

    it('should return false when a conditional is not satisfied w/params', (done) => {
      rbac.check('user', 'edit article', { userId: 1 }, (err, res) => {
        if (err) return done(err);
        should.equal(res, false);
        return done();
      });
    });

    it('should work when a callback conditional is satisfied', (done) => {
      rbac.check('user', 'edit article', { userId: 2 }, (err, res) => {
        if (err) return done(err);
        should.equal(res, true);
        return done();
      });
    });

    it('should work an async conditional is satisfied', (done) => {
      rbac.check('user', 'delete article', { userId: 3 }, (err, res) => {
        if (err) return done(err);
        should.equal(res, true);
        return done();
      });
    });

    it('should allow a higher node to ignore conditionals based on "checkFullPath"', (done) => {
      rbac.check('superadmin', 'delete article', (err, res) => {
        if (err) return done(err);
        should.equal(res, !rbac.checkFullPath);
        return done();
      });
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
  });

  describe('when checking full trees', () => {
    before(() => {
      rbac = new RBAC(rules, true, true);
    });

    it('should return true when a path is found', (done) => {
      rbac.check('admin', 'read articles', (err, res) => {
        if (err) return done(err);
        should.equal(res, true);
        return done();
      });
    });

    it('should return false when a path is not found', (done) => {
      rbac.check('user', 'delete user', (err, res) => {
        if (err) return done(err);
        should.equal(res, false);
        return done();
      });
    });

    it('should return false when a conditional is not satisfied', (done) => {
      rbac.check('user', 'edit article', (err, res) => {
        if (err) return done(err);
        should.equal(res, false);
        return done();
      });
    });

    it('should return false when a conditional is not satisfied w/params', (done) => {
      rbac.check('user', 'edit article', { userId: 1 }, (err, res) => {
        if (err) return done(err);
        should.equal(res, false);
        return done();
      });
    });

    it('should work when a callback conditional is satisfied', (done) => {
      rbac.check('user', 'edit article', { userId: 2 }, (err, res) => {
        if (err) return done(err);
        should.equal(res, true);
        return done();
      });
    });

    it('should work an async conditional is satisfied', (done) => {
      rbac.check('user', 'delete article', { userId: 3 }, (err, res) => {
        if (err) return done(err);
        should.equal(res, true);
        return done();
      });
    });

    it('should allow a higher node to ignore conditionals based on "checkFullPath"', (done) => {
      rbac.check('superadmin', 'delete article', (err, res) => {
        if (err) return done(err);
        should.equal(res, !rbac.checkFullPath);
        return done();
      });
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
  });

  describe('w/caching (callbacks)', () => {
    before(() => {
      rbac = new RBAC(rules, false, true);
    });

    it('should return true when a path is found', (done) => {
      rbac.check('admin', 'read articles', (err, res) => {
        if (err) return done(err);
        should.equal(res, true);
        return done();
      });
    });

    it('should return false when a path is not found', (done) => {
      rbac.check('user', 'delete user', (err, res) => {
        if (err) return done(err);
        should.equal(res, false);
        return done();
      });
    });

    it('should return false when a conditional is not satisfied', (done) => {
      rbac.check('user', 'edit article', (err, res) => {
        if (err) return done(err);
        should.equal(res, false);
        return done();
      });
    });

    it('should return false when a conditional is not satisfied w/params', (done) => {
      rbac.check('user', 'edit article', { userId: 1 }, (err, res) => {
        if (err) return done(err);
        should.equal(res, false);
        return done();
      });
    });

    it('should work when a callback conditional is satisfied', (done) => {
      rbac.check('user', 'edit article', { userId: 2 }, (err, res) => {
        if (err) return done(err);
        should.equal(res, true);
        return done();
      });
    });

    it('should work an async conditional is satisfied', (done) => {
      rbac.check('user', 'delete article', { userId: 3 }, (err, res) => {
        if (err) return done(err);
        should.equal(res, true);
        return done();
      });
    });

    it('should allow a higher node to ignore conditionals based on "checkFullPath"', (done) => {
      rbac.check('superadmin', 'delete article', (err, res) => {
        if (err) return done(err);
        should.equal(res, !rbac.checkFullPath);
        return done();
      });
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
  });
});
