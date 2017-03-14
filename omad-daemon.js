// Usage: node omad-daemon <PORT> <NODE_ENV>
const path = require('path');

process.env.NODE_ENV  = process.argv[3];
process.env.PORT = process.argv[2] || 8088;
process.env.PM2_HOME = path.join(process.env.PRGDIR || __dirname, "./.pm2");

require('./omad-pm2');
