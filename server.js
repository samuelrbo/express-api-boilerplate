require('dotenv-safe').config({silent: true});

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const appName = process.env.APP_NAME;
const port = process.env.PORT;

const api = require('./src/app');

if (cluster.isMaster) {
  console.log('====================================================');
  console.log(`${appName}`);
  console.log('====================================================');
  console.log(`[${appName}] -> Running MASTER process`);
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`[${appName}]- WARNING - : Worker ${worker.process.pid} dies: code: ${code} | signal: ${signal}`);
    console.log(`[${appName}] -> Initializing a new worker`);
    cluster.fork();
  });

} else {
  api.listen(port, '0.0.0.0', () => {
    console.log(`[${appName}] -> Running on port: %d`, port);
    console.log(`[${appName}] -> Running process ${cluster.isMaster ? 'master' : 'child'}!\n`);
  });
}
