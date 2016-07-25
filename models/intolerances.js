'use strict';

module.exports = function() {

  const db = require('../server/db.js');
  const sequelize = db.connection;

  function _create(data, err, success) {
    let payload = {
      userId: data.userId,
      name: data.name
    };
    db.intolerances.create(payload)
    .then(success)
    .catch(err)
  }

  function _find(data, err, success) {
    let payload = data;
    db.intolerances.findAll({
      where: {
        userId: payload.userId
      }
    })
    .then(success)
    .catch(err)
  }

  function _findAll(err, success) {
    db.intolerances.findAll()
    .then(success)
    .catch(err)
  }

  function _update(data, err, success) {
    let payload = data;
    db.intolerances.find({
      where: {
        intoleranceId: payload.intoleranceId,
        userId: payload.userId
      }
    })
    .then((matchedIntolerance) => {
      matchedIntolerance.updateAttributes(payload)
      .then(success)
      .catch(err)
    })
    .catch(err)
  }

  function _destroy(data, err, success) {
    let payload = data;
    db.intolerances.destroy({
      where: {
        intoleranceId: payload.intoleranceId,
        userId: payload.userId
      }
    })
    .then(success)
    .catch(err)
  }

  function _findOrCreate(data, err, success) {
    let payload = data;
    db.intolerances.findOrCreate({
      where: {
        userId: payload.userId,
        intoleranceId: payload.intoleranceId
      },
      defaults: {
        userId: payload.userId,
        name: payload.name
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
    findOrCreate: _findOrCreate
  }

}();
