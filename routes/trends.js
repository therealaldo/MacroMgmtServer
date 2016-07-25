'use strict';
module.exports = function(express) {
  const router = express.Router();
  const async = require('async');
  let trends = require('../models/grocery_lists.js');
  let meals = require('../models/meals.js');
  let users = require('../models/users.js');
  const db = require('../server/db.js');

  router.route('/')

  .get(function(req, res) {

  })


  return router;
};
