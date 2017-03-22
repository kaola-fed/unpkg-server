const db = require('../utils/db');

module.exports = function(req, res, next) {
  if (/get/i.test(req.method)) {
    db.get(function(err, tasks) {
      res.json(tasks || []);
    })
    return;
  }
  db.set(req.body);
  res.sendStatus(200);
}