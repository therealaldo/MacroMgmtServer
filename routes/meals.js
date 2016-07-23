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
    res.send('meals route is working.');
  })

  //If the user decides to remove a meal from their meal plan heres the http request to do that.
  .delete(function(req, res) {
    let data = req.body;

    async.waterfall([
      function(callback) {
        users.find({
          where: { userId: data.userId }
        }, function(err) {
          res.status(500).json({error: err})
        }, function(user) {
          callback(null, user);
        })
      }, function(user, callback) {
        user.removeMeal(data.mealId, function(err) {
          res.status(500).json({error: err})
        }, function(removedMeal) {
          callback(null, removedMeal)
        });
      }
    ],
    function(err, removedMeal) {
      if(err) {
        res.status(500).json({error: err});
      }
      res.status(200).json({
        mealType: data.mealType,
        mealId: removedMeal.mealId
      });
    });
  })

  //Put request to add a meal the user mealPlan
  .put(function(req, res) {
    let data = req.body;
    let meal = {
      mealId: data.meal.id,
      name: data.meal.title,
      image: data.meal.image
    }

    async.waterfall([
      (callback) => {
        users.find({ where: {userId: data.userId}}, (err) => {
          res.status(500).json({ error: err });
        }, (foundUser) => {
          meals.create(data.meal, {
            type: data.mealType,
            date: data.date,
            user: {
              userId: data.userId
            }
          }, {
            include: [ users ]
          }, (err) => {
            res.status(500).json({ error: err });
          },(addedMeal) => {
            callback(null, {
              userId: data.userId,
              type: data.mealType,
              data: data.date,
              meal: addedMeal
            });
          });
        })
      }
    ],
    (err, addedMeal) => {
      if(err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).json(addedMeal);
      }
    })
  });

  router.route('/:userId')

  .get(function(req, res) {
    let userId = req.params.userId;
    users.find({
      where: { userId: userId },
      include: [ meals ]
    }, function(err) {
      res.status(500).json({error: err});
    }, function(foundMeals) {
      res.status(200).json(foundMeals);
    })
  })

  return router;
};
