'use strict';

module.exports = function(express) {
  
  const router = express.Router();
  const async = require('async');
  let groceryList = require('../models/grocery_lists.js');
  let ingredients = require('../models/ingredients.js');
  let users = require('../models/users.js');
  const db = require('../server/db.js');

  router.route('/')

  .get(function(req, res) {

  })

  .put(function(req, res) {
    let data = req.body;

  })

  .delete(function(req, res) {
    let data = req.body;

  })

  return router;
};
