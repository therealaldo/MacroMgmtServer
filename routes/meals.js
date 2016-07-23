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

    async.waterfall([
      (callback) => {
        console.log("USER FIND", data);
        users.find(data,
        (err) => {
          res.status(500).json({ error: err });
        },
        (user) => {
          console.log("USER GET", user.get());
          callback(null, user.get());
        });
      },
      (user, callback) => {
        console.log("MEAL CREATE", data);
        db.meals.create({
          mealId: data.meal.id,
          name: data.meal.name,
          image: data.meal.image
        },
        (err) => {
          res.status(500).json({ error: err });
        },
        (meal) => {
          console.log("MEAL INSTANCE", meal.get());
          callback(null, meal.get());
        });
      }
    ],
    (err, meal) => {
      if(err) {
        res.status(500).json({ error: err });
      } else {
        console.log("FINAL RESULT", meal);
        res.status(200).json({ meal });
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
