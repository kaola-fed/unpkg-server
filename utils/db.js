const Logger = require('chalklog');
const mongoose = require('mongoose');
const softDelete = require('mongoose-delete');

const log = new Logger();

const DB_URI = process.argv[4] || 'mongodb://127.0.0.1/mktdb';
mongoose.connect(DB_URI);

const TaskScheme = new mongoose.Schema({
  name: String,
  email: String,
  sha: String,
  project: String,
  branch: String,
}, { timestamps: {} });

TaskScheme.plugin(softDelete, { overrideMethods: true, deletedAt: true });

const Task = mongoose.model('CITask', TaskScheme);


const isExist = function(event) {
  const project = event.project.name;
  const branch = event.ref.split('/')[2];

  return new Promise(function(resolve, reject) {
    Task.find({ project, branch }, function(err, docs) {
      if (err) return reject(err);
      resolve(docs && docs.length);
    })
  });
};

const updateTask = function(event) {
  const project = event.project.name;
  const branch = event.ref.split('/')[2];

  Task.update({ project, branch }, {
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
  const task = new Task({
    name: event.user_name,
    email: event.user_email,
    sha: event.checkout_sha,
    project: event.project.name,
    branch: event.ref.split('/')[2],
  });
  task.save(function(err, newTask) {
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
    Task.find({}, function(err, tasks) {
      Task.delete({}, function() {
        err && log.red(err);
        callback(err, tasks);
      });
    })
  },
}
