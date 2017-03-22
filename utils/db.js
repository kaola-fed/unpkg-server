const Datastore = require('nedb');

const db = new Datastore({
  filename: 'task.db',
  autoload: true,
});

module.exports = {
  set: function(data) {
    console.log('set db: ', data);
  },
  get: function() {
    console.log('get db');
  },
}
