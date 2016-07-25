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
      (callback) => {
        groceryLists.find(data,
        (err) => {
          res.status(500).json({ error: err });
        },
        (foundGroceryList) => {
          callback(null, foundGroceryList);
        })
      },
      (foundGroceryList, callback) => {
        ingredients.create(data,
        (err) => {
          res.status(500).json({ error: err });
        },
        (createdIngredient) => {
          callback(null, createdIngredient);
        })
      }
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
      (callback) => {
        ingredients.find(data,
        (err) => {
          res.status(500).json({ error: err });
        },
        (deletedIngredient) => {
          callback(null, deletedIngredient);
        });
      }
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
      ingredients.findAll(
      (err) => {
        res.status(500).json({ error: err });
      },
      (allIngredients) => {
        let listIngredients = [];
        for(let i = 0; i < allIngredients.length; i++) {
          if(allIngredients[i].listId === listId) {
            listIngredients.push(allIngredients[i]);
          }
        }
        callback(null, listIngredients);
      });
    ],
    (err, listIngredients) => {
      if(err) {
        res.status(500).json({ error: err });
      }
      res.status(200).json({ listIngredients });
    });
  })

  return router;
};
