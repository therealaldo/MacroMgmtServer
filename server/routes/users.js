'use strict';
module.exports = function(express) {
  const router = express.Router();
  const async = require('async');
  let users = require('../models/users.js');
  const db = require('../db.js');

  router.route('/users')

  //Put request to find a user if they are in the database otherwise if they are not create them
  //and give back the user information needed within the app.
  .put(function(req, res) {
    //Setting data the the request.body
    let data = req.body;
    console.log(data);

    //Using async to do actions in order to receive the right information back.
    async.waterfall([
      users.findOrCreate({ where: { userId: data.userId }, defaults: { email: data.email, token: data.token}},
      function(err) {
        res.status(500).json({error: err});
      }, function(user) {
        callback(null, user);
      })
    ],
    //Callback function to return the values from the fn() above.
    function(err, user) {
      if(err) {
        res.status(500).json({ error: err });
      } else{
        res.status(200).json(user);
      }
    });
  });

  return router;
};
