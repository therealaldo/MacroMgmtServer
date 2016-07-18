'use strict';
module.exports = function(express) {
  const router = express.Router();
  const async = require('async');
  let inventory = require('../models/users.js');
  const db = require('../db.js');

  router.route('/users')

  //Put request to create a record in database.
  .put(function(req, res) {
    let data = req.body;

    async.waterfall([
      users.findOrCreate({ where: { userId: data.userId }, defaults: { email: data.email, token: data.token})
      .spread( function(user, created) {
        callback(null, user)
      })
    ],
    function(err, user) {
      // Display the error if there is one, otherwise, show the response data from the db
      if(err) {
        res.status(500).json({error: err});
      } else{
        res.status(200).json(user);
      }
    });
  });

  return router;
}
