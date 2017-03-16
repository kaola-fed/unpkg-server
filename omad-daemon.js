// Usage: node omad-daemon <PORT> <REPO_URL>
const path = require('path');

process.env.REPO_URL  = process.argv[3] || 'https://registry.npm.taobao.org';
process.env.PORT = process.argv[2] || 8088;
process.env.PM2_HOME = path.join(process.env.PRGDIR || __dirname, "./.pm2");

require('./omad-pm2');
