'use strict';

module.exports = function(express) {

  const router = express.Router();
  const async = require('async');
  let users = require('../models/users.js');
  let ingredients = require('../models/ingredients.js');
  let groceryLists = require('../models/grocery_lists.js');
  const db = require('../server/db.js');

  router.route('/')

  .put((req, res) => {
    let data = req.body;

    async.waterfall([

    ],
    (err, createdIngredient) => {
      if(err) {
        res.status(500).json({ error: err });
      }
      res.status(200).json({ createdIngredient });
    });
  })

  .delete((req, res) => {
    let data = req.body;

    async.waterfall([

    ],
    (err, deletedIngredient) => {
      if(err) {
        res.status(500).json({ error: err });
      }
      res.status(200).json({ deletedIngredient });
    });
  });

  router.route('/:listId')

  .get((req, res) => {
    let listId = req.params.listId;

    async.waterfall([

    ],
    (err, userIngredients) => {
      if(err) {
        res.status(500).json({ error: err });
      }
      res.status(200).json({ userIngredients });
    });
  })

  return router;
};
