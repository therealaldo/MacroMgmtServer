'use strict';
module.exports = function() {

  const db = require('../server/db.js');
  const sequelize = db.connection;

  function _create(data, err, success) {
    let payload = data;
    db.groceryLists.create(payload)
    .then(success)
    .catch(err)
  }

  function _find(data, err, success) {
    let payload = data;
    db.groceryLists.findAll({where: {listId: payload.listId}})
    .then(success)
    .catch(err);
  }

  function _findAll(err, success) {
    db.groceryLists.findAll()
    .then(success)
    .catch(err);
  }

  function _update(data, err, success) {
    let payload = data;
    db.groceryLists.find({where: {listId: payload.listId}})
    .then(function(matchedList) {
      matchedList.updateAttributes(data)
      .then(success)
      .catch(err)
    })
    .catch(err)
  }

  function _destroy(data, err, success) {
    let payload = data;
    db.groceryLists.destroy({where: {listId: payload.listId}})
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
