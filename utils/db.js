const Datastore = require('nedb');
const Logger = require('chalklog');

const log = new Logger();

const db = new Datastore({
  filename: 'task.db',
  autoload: true,
  timestampData: true,
});

const isExist = function(event) {
  return new Promise(function(resolve, reject) {
    db.find({
      project: event.project.name,
      branch: event.project.default_branch,
    }, function(err, docs) {
      if (err) return reject(err);
      resolve(docs && docs.length);
    })
  });
};

const updateTask = function(event) {
  const project = event.project.name;
  const branch = event.project.default_branch;

  db.update({ project, branch }, {
    $set: {
      name: event.user_name,
      email: event.user_email,
      sha: event.checkout_sha,
    },
  }, function(err) {
    if (err) return log.red(err);
    log.green(`Update ${project}/${branch} with SHA: ${event.checkout_sha}`);
  });
};

const insertTask = function(event) {
  db.insert({
    name: event.user_name,
    email: event.user_email,
    sha: event.checkout_sha,
    project: event.project.name,
    branch: event.project.default_branch,
  }, function(err, newTask) {
    if (err) return log.red(err);
    log.green(`Insert new task: ${JSON.stringify(newTask)}`);
  });
}

module.exports = {
  set: function(event) {
    if (event.object_kind !== 'push') {
      return log.red(`Wrong event: ${JSON.stringify(event)}`);
    }

    isExist(event).then(function(exist) {
      if (exist) {
        updateTask(event);
      } else {
        insertTask(event);
      }
    });
  },

  get: function(callback) {
    db.find({}).exec(function(err, tasks) {
      db.remove({}, { multi: true });
      err && log.red(err);
      callback(err, tasks);
    })
  },
}
