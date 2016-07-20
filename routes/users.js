'use strict';
module.exports = function(express) {

const router = express.Router();
const async = require('async');
const db = require('../server/db.js');
let users = require('../models/users.js');

router.route('/')

.get(function(req, res) {
  res.send('Howdy partna');
})

.put(function(req, res) {
  let data = req.body;

  async.waterfall([

    users.findOrCreate({ where: {userId: data.userId },
    defaults: { email: data.email, token: data.token}
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
  });
});

return router;

}
