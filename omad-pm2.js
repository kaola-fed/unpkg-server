const pm2 = require('pm2');

pm2.connect(true, function (err) {
  if (err) {
    console.error(err);
    process.exit(2);
  }
  pm2.start({
    script: 'index.js',
    exec_mode: 'cluster',
    instances: 0,
  }, function (err, apps) {
    if (err) {
      console.error(err)
    };
  });
});

process.on('SIGINT', stopDaemon('SIGINT'));
process.on('SIGTERM', stopDaemon('SIGTERM'));
process.on('exit', function (code) {
  console.log('About to exit with code:', code);
});

function stopDaemon(signal) {
  return function () {
    console.log('About to exit with signal:', signal);
  };
}
