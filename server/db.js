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
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: false
    },
    name: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING
    }
  });

  const _userMeals = _sequelize.define('userMeals', {
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
    },
  });

  const _userGroceryLists = _sequelize.define('userGroceryLists', {

  });

  const _ingredients = _sequelize.define('ingredients', {
    ingredientId: {
      type: Sequelize.UUID
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

  //Relationships
  _users.belongsToMany(_meals, {
    through: {
      model: _userMeals,
      unique: false
    },
    foreignKey: 'userId',
    constraints: false
  });

  _users.belongsToMany(_groceryLists, {
    through: {
      model: _userGroceryLists,
      unique: false
    },
    foreignKey: 'userId',
    constraints: false
  });

  _users.belongsToMany(_intolerances, {
    through: {
      model: _userIntolerances,
      unique: false
    },
      foreignKey: 'userId',
      constraints: false
  });

  _meals.belongsToMany(_users, {
    through: {
      model: _userMeals,
      unique: false
    },
    foreignKey: 'mealId',
    constraints: false
  });

  _groceryLists.belongsToMany(_users, {
    through: {
      model: _userGroceryLists,
      unique: false
    },
    foreignKey: 'listId',
    constraints: false
  });

  _groceryLists.hasMany(_ingredients, {
    foreignKey: 'listId',
    constraints: false
  });

  _intolerances.belongsToMany(_users, {
    through: {
      model: _userIntolerances,
      unique: false
    },
    foreignKey: 'intoleranceId',
    constraints: false
  });

  //Syncs newly created tables and datatypes inside.
  _sequelize.sync({ force: true });

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
  };

}();
