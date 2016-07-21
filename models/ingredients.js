'use strict';
module.exports = function() {

  const db = require('../server/db.js');
  const sequelize = db.connection;

  function _create(data, err, success) {
    let payload = data;
    db.ingredients.create(payload)
    .then(success)
    .catch(err)
  }

  function _find(data, err, success) {
    let payload = data;
    db.ingredients.findAll({where: {mealId: payload.mealId}})
    .then(success)
    .catch(err);
  }

  function _findAll(err, success) {
    db.ingredients.findAll()
    .then(success)
    .catch(err);
  }

  function _update(data, err, success) {
    let payload = data;
    db.ingredients.find({where: {mealId: payload.mealId}})
    .then(function(matchedOrder) {
      matchedOrder.updateAttributes(data)
      .then(success)
      .catch(err)
    })
    .catch(err)
  }

  function _destroy(data, err, success) {
    let payload = data;
    db.ingredients.destroy({where: {mealId: payload.mealId}})
    .then(success)
    .catch(err);
  }

  return {
    create: _create,
    update: _update,
    find: _find,
    findAll: _findAll,
    destroy: _destroy
  }

}();
