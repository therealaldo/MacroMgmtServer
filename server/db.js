'use strict';

module.exports = function() {

  const dotenv = require('dotenv').load();
  const Sequelize = require('sequelize');
  const mysql = require('mysql');

  const _sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  });

  const _users = _sequelize.define('users', {
    userId: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING
    },
    token: {
      type: Sequelize.STRING
    }
  });

  const _meals = _sequelize.define('meals', {
    mealId: {
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.STRING
    },
    mealType: {
      type: Sequelize.STRING
    }
  });

  const _groceryLists = _sequelize.define('groceryLists', {
    listId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
  });

  const _ingredients = _sequelize.define('ingredients', {
    ingredientId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: Sequelize.STRING
    },
    completed: {
      type: Sequelize.BOOLEAN
    }
  });

  const _intolerances = _sequelize.define('intolerances', {
    intoleranceId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.BOOLEAN
    }
  });

  //Relationships
  _users.hasMany(_meals, { foreignKey: 'userId' });
  _users.hasMany(_groceryLists, { foreignKey: 'userId' });
  _users.hasMany(_intolerances, { foreignKey: 'userId' });
  _groceryLists.hasMany(_ingredients, { foreignKey: 'listId' });

  //Syncs newly created tables and datatypes inside.
  _sequelize.sync();

  return {
    connection: _sequelize,
    groceryLists: _groceryLists,
    ingredients: _ingredients,
    meals: _meals,
    intolerances: _intolerances,
    users: _users,
  };

}();
