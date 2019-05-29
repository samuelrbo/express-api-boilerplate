
module.exports = (app, express) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.send('API V1');
  });

  // Endpoints
  require('./routes/auth')(router);

  app.use('/api/v1', router);
};
