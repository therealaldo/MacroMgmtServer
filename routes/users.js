'use strict';
module.exports = function(express) {

const router = express.Router();
const async = require('async');
const db = require('../server/db.js');
let users = require('../models/users.js');

router.route('/')

.get((req, res) => {
  res.send('Howdy partna');
})

.put((req, res) => {
  let data = req.body;

  async.waterfall([
    (callback) => {
      users.findOrCreate(data, (err) => {
        res.status(500).json({ error: err });
      },
      (user) => {
        let foundOrCreatedUser = user[0].dataValues;
        callback(null, foundOrCreatedUser);
      });
    },
    (foundOrCreatedUser, callback) => {
      users.find(foundOrCreatedUser, (err) => {
        res.status(500).json({ error: err })
      },
      (foundUser) => {
        callback(null, foundUser);
        console.log(foundUser);
      })
    }
  ],
  (err, foundUser) => {
    if(err) {
      res.status(500).json({ error: err });
    }
    res.status(200).json(foundUser);
  });
});

return router;

}
