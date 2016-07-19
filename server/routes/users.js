'use strict';
module.exports = function (express) {

const router = express.Router();
const async = require('async');
const db = require('../db.js');
let users = require('../models/users.js');

router.route('/users')
.post(function(req, res) {
  let data = req.body;

  async.waterfall([

    users.findOrCreate({ where: {userId: data.userId },
    defaults: { email: data.email, toke: data.token}
    }, function(err) {
      res.status(500).json({ error: err });
    }, function(user) {
      callback(null, user);
    })
  ], function(err, user) {
    if(err) {
      res.status(500).json({ error: err });
    } else {
      res.status(200).json(user);
    }
  })
})

return router;

}
