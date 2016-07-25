'use strict';

module.exports = function(express) {

  const router = express.Router();
  const async = require('async');
  let meals = require('../models/meals.js');
  let users = require('../models/users.js');
  const db = require('../server/db.js');

  router.route('/')

  .get((req, res) => {
    let data = req.body;

    async.waterfall([
      (callback) => {
        meals.findAll(
        (err) => {
          res.status(500).json({ error: err });
        },
        (userMeals) => {
          callback(null, userMeals);
        })
      }
    ],
    (err, userMeals) => {
      if(err) {
        res.status(500).json({ error: err });
      }
      res.status(200).json({ userMeals });
    })
  })

  .delete(function(req, res) {
    let data = req.body;

    async.waterfall([
      (callback) => {
        meals.destroy(data,
        (err) => {
          res.status(500).json({ error: err });
        },
        (destroyedMeal) => {
          callback(null, destroyedMeal);
        })
      }
    ],
    (err, destroyedMeal) => {
      if(err) {
        res.status(500).json({ error: err });
      }
      res.status(200).json({ destroyedMeal });
    });
  })

  .put(function(req, res) {
    let data = req.body;

    let savedData = {};
    savedData.meals = [];

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
        console.log("FOUND USER", foundUser);
        meals.create(data,
        (err) => {
          res.status(500).json({ error: err });
        },
        (createdMeal) => {
          callback(null, user);
        });
      },
      (foundUser, callback) => {
        meals.find(foundUser,
        (err) => {
          res.status(500).json({ error: err });
        },
        (foundMeals) => {
          savedData = foundUser.dataValues;
          savedData.meals = foundMeals;

          callback(null, savedData);
        })
      }
    ],
    (err, savedData) => {
      if(err) {
        res.status(500).json({ error: err });
      }
      res.status(200).json({ savedData });
    });
  });

  router.route('/:userId')

  .get(function(req, res) {
    let userId = req.params.userId;
    async.waterfall([
      (callback) => {
        db.meals.find({
          where: {
            userId: userId
          }
        },
        (err) => {
          res.status(500).json({ error: err });
        },
        (userMeals) => {
          callback(null, userMeals);
        })
      }
    ],
    (err, userMeals) => {
      if(err) {
        res.status(500).json({ error: err });
      }
      res.status(200).json({ userMeals });
    })
  });

  return router;
};
