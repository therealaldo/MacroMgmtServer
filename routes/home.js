'use strict';

module.exports = function(express) {

  const router = express.Router();

  router.get('/', (req,res) => {
    res.send('Homepage');
  })

  return router;
};
