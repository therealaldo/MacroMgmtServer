'use strict';
module.exports = function(express) {
  const router = express.Router();
  const async = require('async');
  let meals = require('../models/meals.js');
  let userMeals = require('../models/user_meals.js');
  let users = require('../models/users.js');
  const db = require('../db.js');

  router.route('/meals')

  //Get request to grab the users meals based on selectedDate.
  .get(function(req, res) {
    //Setting the data to request body and giving userMealPlan the data it needs.
    let data = req.body;
    let userMealPlan = {
      userId: data.userId,
      meals: [],
      date: data.date,
    };

    //Async function to find the users meals and then
    async.waterfall([
      users.find({
        where: { userId: data.userId },
        include: [ meals ]
      }, function(err) {
        res.status(500).json({error: err});
      }, function(foudnMeals) {
        for(let meal in foundMeals.meals) {
          if(meal.userMeals.date === data.date) {
            userMealPlan.meals.concat(meal)
          }
        }
      })
    ],
    function(err, userMealPlan) {
      if(err) {
        res.status(500).json({error: err});
      } else{
        res.status(200).json(userMealPlan);
      }
    });
  })

  //If the user decides to remove a meal from their meal plan heres the http request to do that.
  .delete(function(req, res) {
    let data = req.body;

    users.find({
      where: { userId: data.userId }
    }, function(err) {
      res.status(500).json({error: err})
    }, function(user) {
      user.removeMeal(data.mealId);
      res.status(200).json({
        mealType: data.mealType,
        mealId: data.mealId
      })
    })
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
      function(callback) {
        users.find({ where: { userId: data.userId }})
        .then(function(user) {
          user.addMeal(meal, {
            type: data.mealType,
            date: data.date
          });
          callback(null, {
            userId: data.userId,
            date: data.date,
            mealType: data.mealType,
            meal: meal
          })
        })
      }
    ],
    function(err, addedMeal) {
      if(err) {
        res.status(500).json({ error: err });
      } else{
        res.status(200).json(addedMeal);
      }
    });
  });

  return router;
}
