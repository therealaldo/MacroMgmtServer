'use strict';

module.exports = function(express) {

  const router = express.Router();
  const async = require('async');
  const db = require('../server/db.js');
  
  let intolerances = require('../models/intolerances.js');
  let users = require('../models/users.js');

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
        console.log("CREATE INTOLERANCE", foundUser);
        intolerances.create(data,
        (err) => {
          console.log("ERROR ON CREATE INTOLERANCE");
          res.status(500).json({ error: err });
        },
        (createdIntolerance) => {
          console.log("CREATED INTOLERANCE", createdIntolerance);
          callback(null, createdIntolerance);
        });
      }
    ],
    (err, createdIntolerance) => {
      if(err) {
        res.status(500).json({ error: err });
      }
      res.status(200).json({ createdIntolerance });
    });
  })

  .delete((req, res) => {
    let data = req.body;

    async.waterfall([
      (callback) => {
        console.log("INTOLERANCE FIND", data);
        intolerances.find(data,
        (err) => {
          console.log("ERROR ON INTOLERANCE FIND");
          res.status(500).json({ error: err });
        },
        (deletedIntolerance) => {
          console.log("DELETED INTOLERANCE", deletedIntolerance);
          callback(null, deletedIntolerance);
        });
      }
    ],
    (err, deletedIntolerance) => {
      if(err) {
        res.status(500).json({ error: err });
      }
      res.status(200).json({ deletedIntolerance });
    });
  })

  router.route('/:userId')

  .get((req, res) => {
    let userId = req.params.userId;

    async.waterfall([
      (callback) => {
        console.log("INTOLERANCE FIND ALL", userId);
        intolerances.findAll(
        (err) => {
          console.log("ERROR ON INTOLERANCE FINDALL");
          res.status(500).json({ error: err });
        },
        (allIntolerances) => {
          console.log("ALL INTOLERANCES", allIntolerances);
          let userIntolerances = [];
          for(let i = 0; i < allIntolerances.length; i++) {
            if(allIntolerances[i].userId === userId) {
              userIntolerances.push(allIntolerances[i]);
            }
          }
          callback(null, userIntolerances);
        });
      }
    ],
    (err, userIntolerances) => {
      if(err) {
        res.status(500).json({ error: err });
      }
      res.status(200).json({ userIntolerances });
    });
  })

  return router;
};
