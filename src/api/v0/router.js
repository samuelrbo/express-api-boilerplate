
module.exports = (app, express) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.send('API V0');
  });

  /**
   * API version endpoints, 
   */
  // Endpoints
  
  app.use('/api/v0', router);
};
