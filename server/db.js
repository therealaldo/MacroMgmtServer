'use strict';
module.exports = function() {
  const dotenv = require('dotenv').load();
  const Sequelize = require('sequelize');
  const mysql = require('mysql');

  const _sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    socketPath: '/var/run/mysqld/mysqld.sock',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  });

  const _groceryLists = _sequelize.define('groceryLists', {
    listId: {
      type: Sequelize.UUID,
    },
  });

  const _userGroceryLists = _sequelize.define('userGroceryLists', {

  });

  const _ingredients = _sequelize.define('ingredients', {
    ingredientId: {
      type: Sequelize.UUID
    },
    quantity: {
      type: Sequelize.INTEGER
    }
  });

  const _meals = _sequelize.define('meals', {
    mealId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    imageUri: {
      type: Sequelize.STRING
    }
  });

  const _userMeals = _sequelize.define('userMeals', {
    date: {
      type: Sequelize.DATEONLY
    },
    type: {
      type: Sequelize.STRING
    }
  });

  const _intolerances = _sequelize.define('intolerances', {
    intoleranceId: {
      type: Sequelize.UUID
    },
    name: {
      type: Sequelize.STRING
    }
  });

  const _userIntolerances = _sequelize.define('userIntolerances', {
    status: {
      type: Sequelize.BOOLEAN
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
  });

  const _settings = _sequelize.define('settings', {
    nutritionFacts: {
      type: Sequelize.BOOLEAN
    },
    notifications: {
      type: Sequelize.BOOLEAN
    },
    recommendations: {
      type: Sequelize.BOOLEAN
    }
  });

  //Relationships
  _users.hasMany(_userMeals, { foreignKey: 'userId' });
  _meals.hasMany(_userMeals, { foreignKey: 'mealId' });
  _users.hasOne(_settings, { foreignKey: 'userId' });
  _users.hasMany(_userGroceryLists, { foreignKey: 'userId' });
  _users.hasMany(_userIntolerances, { foreignKey: 'userId' });
  _intolerances.hasMany(_userIntolerances, { foreignKey: 'intoleranceId' })
  _groceryLists.hasMany(_userGroceryLists, { foreignKey: 'listId' });
  _ingredients.hasMany(_groceryLists, { foreignKey: 'ingredientId'} )

  //Syncs newly created tables and datatypes inside.
  _sequelize.sync();

  return {
    connection: _sequelize,
    groceryLists: _groceryLists,
    userGroceryLists: _userGroceryLists,
    ingredients: _ingredients,
    meals: _meals,
    userMeals: _userMeals,
    intolerances: _intolerances,
    userIntolerances: _userIntolerances,
    users: _users,
    settings: _settings,
  }

}();
