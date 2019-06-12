
module.exports = (app, express) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.send('API V1');
  });

  // Endpoints

  app.use('/api/v1', router);
};
