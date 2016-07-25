'use strict';

module.exports = function(express) {

  const router = express.Router();
  const async = require('async');
  let groceryLists = require('../models/grocery_lists.js');
  let ingredients = require('../models/ingredients.js');
  let users = require('../models/users.js');
  const db = require('../server/db.js');

  router.route('/')

  .put((req, res) => {
    let data = req.body;

    async.waterfall([
      (callback) => {
        users.find(data,
        (err) => {
          res.status(500).json({ error: err });
        },
        (foundUser) => {
          callback(null, foundUser);
        });
      },
      (foundUser, callback) => {
        groceryLists.create(data,
        (err) => {
          res.status(500).json({ error: err });
        },
        (createdList) => {
          callback(null, createdList)
        });
      }
    ],
    (err, createdList) => {
      if(err) {
        res.status(500).json({ error: err });
      }
      res.status(200).json({ createdList });
    });
  })

  .delete((req, res) => {
    let data = req.body;

    async.waterfall([
      (callback) => {
        groceryLists.find(data,
        (err) => {
          res.status(500).json({ error: err });
        },
        (deletedList) => {
          callback(null, deletedList);
        });
      }
    ],
    (err, deletedList) => {
      if(err) {
        res.status(500).json({ error: err });
      }
      res.status(200).json({ deletedList });
    });
  });

  router.route('/:userId')

  .get((req, res) => {
    let userId = req.params.userId;

    async.waterfall([
      (callback) => {
        groceryLists.findAll(
        (err) => {
          res.status(500).json({ error: err });
        },
        (allLists) => {
          let userGroceryLists = [];
          for(let i = 0; i < allLists.length; i++) {
            if(allLists[i].userId === userId) {
              userGroceryLists.push(allLists[i]);
            }
          };
          callback(null, userGroceryLists);
        });
      }
    ],
    (err, userGroceryLists) => {
      if(err) {
        res.status(500).json({ error: err });
      }
      res.status(200).json({ userGroceryLists });
    });
  });

  return router;
};
