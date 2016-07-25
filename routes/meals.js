'use strict';

module.exports = function(express) {

  const router = express.Router();
  const async = require('async');
  let meals = require('../models/meals.js');
  let userMeals = require('../models/user_meals.js');
  let users = require('../models/users.js');
  const db = require('../server/db.js');

  router.route('/')

  .get((req, res) => {
    let data = req.body;

    async.waterfall([
      (callback) => {
        db.userMeals.findAll({
          group: 'mealType'
        }).then((userMeals) => {
          callback(null, userMeals);
        }).catch((err) => {
          res.status(500).json({ error: err });
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
        db.userMeals.destroy({
          where: {
            userId: data.userId,
            mealId: data.mealId,
            date: data.date,
            mealType: data.mealType
          }
        }).then((userMeal) => {
          callback(null, userMeal)
        }).catch((err) => {
          res.status(500).json({ error: err });
        })
      }
    ],
    (err, userMeal) => {
      if(err) {
        res.status(500).json({ error: err });
      }
      res.status(200).json({ userMeal });
    });
  })

  .put(function(req, res) {
    let data = req.body;

    async.waterfall([
      (callback) => {
        db.users.find({
          where: {
            userId: data.userId
          }
        }).then((user) => {
          callback(null, user);
        }).catch((err) => {
          res.status(500).json({ error: err });
        })
      }
    ],
    (err, user) => {
      if(err) {
        res.status(500).json({ error: err });
      }
      res.status(200).json({ user });
    });
  });

  router.route('/:userId')

  .get(function(req, res) {
    let userId = req.params.userId;
    db.meals.findAll({ include: [ db.users ] }).then((meals) => {
      res.status(200).json({ meals });
    }).catch((err) => {
      res.status(500).json({ error: err });
    })
  });

  return router;
};
