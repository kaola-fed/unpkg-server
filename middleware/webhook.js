const db = require('../utils/db');

const CI_PASS = process.argv[5] || 'ci';

module.exports = function(req, res, next) {
  if (/get/i.test(req.method)) {
    if (req.get('X-CI-Header') !== CI_PASS) {
      return res.send(':-)');
    }
    db.get(function(err, tasks) {
      res.json(tasks || []);
    })
    return;
  }
  db.set(req.body);
  res.sendStatus(200);
}