'use strict';
module.exports = function(express) {
  const router = express.Router();
  const async = require('async');
  let meals = require('../models/meals.js');
  let userMeals = require('../models/user_meals.js');
  let users = require('../models/users.js');
  const db = require('../db.js');

  router.route('/meals')

  //Put request to create a record in database.
  .get(function(req, res) {
    let data = req.body;
    let userMealPlan = {
      userId: data.userId,
      meals: [],
      date: data.date,
    };
    async.waterfall([
      function(callback) {
        users.find({
          where: {userId: data.userId},
          include: [ meals ]
        })
        .then(function(foundMeals) {
          for(let meal in foundMeals.meals) {
            if(meal.userMeals.date === data.date) {
              userMealPlan.meals.concat(meal)
            }
          }
        })
      }

    ],
    function(err, userMealPlan) {
      if(err) {
        res.status(500).json({error: err});
      } else{
        res.status(200).json(userMealPlan);
      }
    });
  })

  .delete(function(req, res) {
    let data = req.body;

    users.find({
      where: {userId: data.userId},
      include: [ meals ]
    })
    .then(function(foundMeals) {
      
    })
  })

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

    ],
    function(err, addedMeal) {
      // Display the error if there is one, otherwise, show the response data from the db
      if(err) {
        res.status(500).json({error: err});
      } else{
        res.status(200).json(addedMeal);
      }
    });
  });

  return router;
}
