'use strict';

module.exports = function() {

  const db = require('../server/db.js');
  const sequelize = db.connection;

  function _create(data, err, success) {
    let payload = {
      userId: data.userId,
      mealId: data.mealId,
      name: data.name,
      image: data.image,
      date: data.date,
      mealType: data.mealType,
      calories: data.calories
    };
    db.meals.create(payload)
    .then(success)
    .catch(err)
  }

  function _find(data, err, success) {
    let payload = data;
    db.meals.find({
      where: {
        userId: payload.userId
      }
    })
    .then(success)
    .catch(err)
  }

  function _findAll(err, success) {
    db.meals.findAll()
    .then(success)
    .catch(err)
  }

  function _update(data, err, success) {
    let payload = data;
    db.meals.find({
      where: {
        mealId: payload.mealId,
        userId: payload.userId,
        date: payload.date,
        mealType: payload.mealType
      }
    })
    .then(function(matchedMeal) {
      matchedMeal.updateAttributes(data)
      .then(success)
      .catch(err)
    })
    .catch(err)
  }

  function _destroy(data, err, success) {
    let payload = data;
    db.meals.destroy({
      where: {
        mealId: payload.mealId,
        userId: payload.userId,
        date: payload.date,
        mealType: payload.mealType
      }
    })
    .then(success)
    .catch(err)
  }

  return {
    create: _create,
    update: _update,
    find: _find,
    findAll: _findAll,
    destroy: _destroy,
  }

}();
