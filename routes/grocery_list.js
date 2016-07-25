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
        console.log("USER FIND", data);
        users.find(data,
        (err) => {
          console.log("ERROR ON USER FIND");
          res.status(500).json({ error: err });
        },
        (foundUser) => {
          console.log("FOUND USER", foundUser);
          callback(null, foundUser);
        });
      },
      (foundUser, callback) => {
        console.log("CREATE LIST", foundUser);
        groceryLists.create(data,
        (err) => {
          console.log("ERROR ON CREATE LIST");
          res.status(500).json({ error: err });
        },
        (createdList) => {
          console.log("CREATED LIST", createdList);
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
        console.log("GROCERY LIST FIND", data);
        groceryLists.find(data,
        (err) => {
          console.log("ERROR ON GROCERY LIST FIND");
          res.status(500).json({ error: err });
        },
        (deletedList) => {
          console.log("DELETED GROCERY LIST", deletedList);
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
        console.log("GROCERY LIST FIND ALL", userId);
        groceryLists.findAll(
        (err) => {
          console.log("ERROR ON GROCERY LIST FINDALL");
          res.status(500).json({ error: err });
        },
        (allLists) => {
          console.log("ALL GROCERY LISTS", allLists);
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
