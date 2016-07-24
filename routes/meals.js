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
      (callback) => {
        console.log("FIND", data);
        users.find(data, {
          include: [{
            model: meals,
            through: {
              where: { mealId: data.mealId }
            }
          }]
        },
        (err) => {
          res.status(500).json({ error: err });
        },
        (user) => {
          console.log("FOUND USER", JSON.stringify(user));
        })
      }
    ],
    (err, meals) => {
      if(err) {
        res.status(500).json({ error: err });
      }
      res.status(200).json({ meals });
    });
  })

  //Put request to add a meal the user mealPlan
  .put(function(req, res) {
    let data = req.body;

    async.waterfall([
      (callback) => {
        users.find(data,
        (err) => {
          res.status(500).json({ error: err });
        },
        (user) => {
          db.meals.create({
            mealId: data.meal.id,
            name: data.meal.name,
            image: data.meal.image
          }).then((meal) => {
            user.addMeal(meal, {
              date: data.date,
              mealType: data.mealType
            }).then(() => {
              user.getMeals().then((meals) => {
                callback(null, meals);
              }).catch((err) => {
                res.status(500).json({ error: err });
              })
            });
          }).catch((err) => {
            res.status(500).json({ error: err });
          })
        })
      }
    ],
    (err, meals) => {
      if(err) {
        res.status(500).json({ error: err });
      }
      res.status(200).json({ meals });
    });
  });

  router.route('/:userId')

  .get(function(req, res) {
    let userId = req.params.userId;
    users.find({
      where: { userId: userId },
      include: [ meals ]
    }, function(err) {
      res.status(500).json({ error: err });
    }, function(foundMeals) {
      res.status(200).json(foundMeals);
    })
  });

  return router;
};
