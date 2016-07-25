'use strict';
module.exports = function() {

  const db = require('../server/db.js');
  const sequelize = db.connection;

  function _create(data, err, success) {
    let payload = data;
    db.userMeals.create(payload)
    .then(success)
    .catch(err)
  }

  function _find(data, err, success) {
    let payload = data;
    db.userMeals.findAll({ where: {
      userId: payload.userId,
      mealId: payload.mealId,
      date: payload.date,
      mealType: payload.mealType
    }})
    .then(success)
    .catch(err);
  }

  function _findAll(err, success) {
    db.userMeals.findAll()
    .then(success)
    .catch(err);
  }

  function _update(data, err, success) {
    let payload = data;
    db.userMeals.find({ where: {
      userId: payload.userId,
      mealId: payload.mealId,
      date: payload.date,
      mealType: payload.mealType
    }})
    .then(function(matchedOrder) {
      matchedOrder.updateAttributes(data)
      .then(success)
      .catch(err)
    })
    .catch(err)
  }

  function _destroy(data, err, success) {
    let payload = data;
    db.userMeals.destroy({ where: {
      userId: payload.userId,
      mealId: payload.mealId,
      date: payload.date,
      mealType: payload.mealType
    }})
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
