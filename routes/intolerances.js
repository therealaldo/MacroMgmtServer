'use strict';

module.exports = function(express) {

  const router = express.Router();
  const async = require('async');
  let intolerances = require('../models/intolerances.js');
  let users = require('../models/users.js');
  const db = require('../server/db.js');

  router.route('/')

  .put((req, res) => {
    let data = req.body;

    async.waterfall([

    ],
    (err, createdIntolerance) => {
      if(err) {
        res.status(500).json({ error: err });
      }
      res.status(200).json({ createdIntolerance });
    });
  })

  .delete((req, res) => {
    let data = req.body;

    async.waterfall([

    ],
    (err, deletedIntolerance) => {
      if(err) {
        res.status(500).json({ error: err });
      }
      res.status(200).json({ deletedIntolerance });
    });
  });

  router.route('/:userId')

  .get((req, res) => {
    let userId = req.params.userId;

    async.waterfall([

    ],
    (err, userIntolerances) => {
      if(err) {
        res.status(500).json({ error: err });
      }
      res.status(200).json({ userIntolerances });
    });
  });

  return router;
};
