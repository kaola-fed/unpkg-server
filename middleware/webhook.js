const db = require('../utils/db');

const CI_TOKEN = process.argv[5] || 'ci';

module.exports = function(req, res, next) {
  if (req.get('X-Gitlab-Token') !== CI_TOKEN) {
    return res.send(':-)');
  }

  if (/get/i.test(req.method)) {
    db.get(function(err, tasks) {
      res.json(tasks || []);
    })
    return;
  }
  db.set(req.body);
  res.sendStatus(200);
}