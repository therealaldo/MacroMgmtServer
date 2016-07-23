'use strict';
module.exports = function() {

  const db = require('../server/db.js');
  const sequelize = db.connection;

  function _create(data, err, success) {
    let payload = data;
    db.users.create(payload)
    .then(success)
    .catch(err)
  }

  function _find(data, err, success) {
    let payload = data;
    db.users.find({ where: { userId: payload.userId } })
    .then(success)
    .catch(err);
  }

  function _findAll(err, success) {
    db.users.findAll()
    .then(success)
    .catch(err);
  }

  function _update(data, err, success) {
    let payload = data;
    db.users.find({where: {userId: payload.userId}})
    .then(function(users) {
      users.updateAttributes(data)
      .then(success)
      .catch(err)
    })
    .catch(err)
  }

  function _destroy(data, err, success) {
    let payload = data;
    db.users.destroy({where: {userId: payload.userId}})
    .then(success)
    .catch(err);
  }

  function _findOrCreate(data, err, success) {
    let payload = data;
    db.users.findOrCreate({
      where: {
        userId: data.userId
      },
      defaults: {
        userId: data.userId,
        email: data.email,
        token: data.token
      }
    })
    .then(success)
    .catch(err);
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
