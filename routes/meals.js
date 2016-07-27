'use strict';

module.exports = function(express) {

  const router = express.Router();
  const async = require('async');
  const db = require('../server/db.js');

  let meals = require('../models/meals.js');
  let users = require('../models/users.js');

  router.route('/')

  .get((req, res) => {

    async.waterfall([
      (callback) => {
        meals.findAll(
        (err) => {
          res.status(500).json({ error: err });
        },
        (meals) => {
          callback(null, meals);
        });
      }
    ],
    (err, meals) => {
      if(err) {
        res.status(500).json({ error: err });
      }
      res.status(200).json({ meals });
    });
  })

  .delete((req, res) => {
    let data = req.body;

    async.waterfall([
      (callback) => {
        meals.destroy(data,
        (err) => {
          res.status(500).json({ error: err });
        },
        (destroyedMeal) => {
          callback(null, destroyedMeal);
        });
      }
    ],
    (err, destroyedMeal) => {
      if(err) {
        res.status(500).json({ error: err });
      }
      res.status(200).json({ destroyedMeal });
    });
  })

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
        meals.create(data,
        (err) => {
          res.status(500).json({ error: err });
        },
        (createdMeal) => {
          callback(null, foundUser);
        });
      },
      (foundUser, callback) => {
        meals.find(data,
        (err) => {
          res.status(500).json({ error: err });
        },
        (createdMeal) => {
          callback(null, createdMeal);
        });
      }
    ],
    (err, createdMeal) => {
      if(err) {
        res.status(500).json({ error: err });
      }
      res.status(200).json({ createdMeal });
    });
  });

  router.route('/:userId')

  .get((req, res) => {
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
          userMeals.filter((userMeals) => {
            return userMeals.date == data.date
          });
          callback(null, userMeals);
        });
      }
    ],
    (err, userMeals) => {
      if(err) {
        res.status(500).json({ error: err });
      }
      res.status(200).json({ userMeals });
    });
  });

  return router;

};
