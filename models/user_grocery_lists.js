'use strict';
module.exports = function() {

  const db = require('../server/db.js');
  const sequelize = db.connection;

  function _create(data, err, success) {
    let payload = data;
    db.userGroceryLists.create(payload)
    .then(success)
    .catch(err)
  }

  function _find(data, err, success) {
    let payload = data;
    db.userGroceryLists.findAll({where: {listId: payload.listId}})
    .then(success)
    .catch(err);
  }

  function _findAll(err, success) {
    db.userGroceryLists.findAll()
    .then(success)
    .catch(err);
  }

  function _update(data, err, success) {
    let payload = data;
    db.userGroceryLists.find({where: {listId: payload.listId}})
    .then(function(matchedOrder) {
      matchedOrder.updateAttributes(data)
      .then(success)
      .catch(err)
    })
    .catch(err)
  }

  function _destroy(data, err, success) {
    let payload = data;
    db.userGroceryLists.destroy({where: {listId: payload.listId}})
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
