require('dotenv-safe').config({silent: true});

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

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
    console.log(`- WARNING - : Worker ${worker.process.pid} dies: code: ${code} | signal: ${signal}`);
    console.log(`[${appName}] -> Initializing a new worker`);
    cluster.fork();
  });

} else {
  api.lis
}
