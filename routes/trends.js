'use strict';

module.exports = function(express) {

  const router = express.Router();
  const async = require('async');
  let trends = require('../models/grocery_lists.js');
  let meals = require('../models/meals.js');
  let users = require('../models/users.js');
  const db = require('../server/db.js');

  router.route('/:userId')

  .get(function(req, res) {
    let userId = req.params.userId;

    async.waterfall([
      (callback) => {
        meals.findAll(
        (err) => {
          res.status(500).json({ error: err });
        },
        (allMeals) => {
          let userMeals = [];
          for(let i = 0; i < allMeals.length; i++) {
            if(allMeals[i].userId === userId) {
              userMeals.push(allMeals[i]);
            }
          }
          callback(null, userMeals);
        });
      }
    ],
    (err, userMealData) => {
      if(err) {
        res.status(500).json({ error: err });
      }
      res.status(200).json({ userMealData });
    });
  })


  return router;
};
