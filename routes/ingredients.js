'use strict';

module.exports = function(express) {

  const router = express.Router();
  const async = require('async');
  const db = require('../server/db.js');

  let users = require('../models/users.js');
  let groceryLists = require('../models/grocery_lists.js');
  let ingredients = require('../models/ingredients.js');

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
        });
      },
      (foundGroceryList, callback) => {
        ingredients.create(data,
        (err) => {
          res.status(500).json({ error: err });
        },
        (createdIngredient) => {
          callback(null, createdIngredient);
        });
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
        console.log("INGREDIENT FIND", data);
        ingredients.destroy(data,
        (err) => {
          res.status(500).json({ error: err });
        },
        (deletedIngredient) => {
          console.log("DELETED INGREDIENT", deletedIngredient);
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
      (callback) => {
        console.log("INGREDIENT FIND ALL", listId);
        ingredients.findAll(
        (err) => {
          res.status(500).json({ error: err });
        },
        (allIngredients) => {
          console.log("ALL INGREDIENTS", allIngredients);
          let listIngredients = [];
          for(let i = 0; i < allIngredients.length; i++) {
            if(allIngredients[i].listId === listId) {
              listIngredients.push(allIngredients[i]);
            }
          }
          callback(null, listIngredients);
        });
      }
    ],
    (err, listIngredients) => {
      if(err) {
        res.status(500).json({ error: err });
      }
      res.status(200).json({ listIngredients });
    });
  });

  return router;

};
