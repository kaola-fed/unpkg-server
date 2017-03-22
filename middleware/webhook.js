const db = require('../utils/db');

module.exports = function(req, res, next) {
  if (/get/i.test(req.method)) {
    return res.json(db.get());
  }
  db.set(req.body);
  res.sendStatus(200);
}