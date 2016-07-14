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

  const _groceryLists = _sequelize.define('groceryLists', {
    listId: {
      type: Sequelize.UUID,
    },
    quantity: {
      type: Sequelize.INTEGER
    }
  });

  const _ingredients = _sequelize.define('ingredients', {

    quantity: {
      type: Sequelize.INTEGER
    }
  });

  const _items = _sequelize.define('items', {
    itemId: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING
    }
  });

  const _mealType = _sequelize.define('mealType', {
    typeId: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    category: {
      type: Sequelize.STRING
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
    /*calories: {
      type: Sequelize.INTEGER
    },
    fat: {
      type: Sequelize.INTEGER
    },
    cholesterol: {
      type: Sequelize.INTEGER
    },
    sodium: {
      type: Sequelize.INTEGER
    },
    carbs: {
      type: Sequelize.INTEGER
    },
    protein: {
      type: Sequelize.INTEGER
    },
    prepTime: {
      type: Sequelize.STRING
    },
    cookTime: {
      type: Sequelize.STRING
    },*/
  });

  const _preferences = _sequelize.define('preferences', {
    status: {
      type: Sequelize.UUID
    }
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

  const _userGoals = _sequelize.define('userGoals', {
    weightGoal: {
      type: Sequelize.INTEGER
    }
  });

  const _userGroceryLists = _sequelize.define('userGroceryLists', {

  });

  const _userIntake = _sequelize.define('userIntake', {
    date: {
      type: Sequelize.DATEONLY
    },
    calories: {
      type: Sequelize.INTEGER
    },
    fat: {
      type: Sequelize.INTEGER
    },
    cholesterol: {
      type: Sequelize.INTEGER
    },
    sodium: {
      type: Sequelize.INTEGER
    },
    carbs: {
      type: Sequelize.INTEGER
    },
    protein: {
      type: Sequelize.INTEGER
    }
  });

  const _userMeals = _sequelize.define('userMeals', {
    dateFor: {
      type: Sequelize.DATEONLY
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
    /*dob: {
      type: Sequelize.DATEONLY
    },
    gender: {
      type: Sequelize.STRING
    },
    height: {
      type: Sequelize.STRING
    },
    location: {
      type: Sequelize.STRING
    }*/
  });

  //Relationships
  _users.hasMany(_userMeals, {foreignKey: 'userId'});
  _users.hasMany(_settings, {foreignKey: 'userId'});
  _users.hasMany(_userGroceryLists, {foreignKey: 'userId'});
  _users.hasMany(_userIntake, {foreignKey: 'userId'});
  _users.hasMany(_preferences, {foreignKey: 'userId'});
  _items.hasMany(_preferences, {foreignKey: 'itemId'});
  _items.hasMany(_ingredients, {foreignKey: 'itemId'});
  _items.hasMany(_groceryLists, {foreignKey: 'itemId'});
  _groceryLists.hasMany(_userGroceryLists, {foreignKey: 'listId'});
  _mealType.hasMany(_meals, {foreignKey: 'typeId'});
  _meals.hasMany(_ingredients, {foreignKey: 'mealId'});
  _meals.hasMany(_userMeals, {foreignKey: 'mealId'});
  _users.hasOne(_userGoals, {foreignKey: 'userId'});


  //Syncs newly created tables and datatypes inside.
  _sequelize.sync();

  return {
    connection: _sequelize,
    groceryLists: _groceryLists,
    ingredients: _ingredients,
    items: _items,
    mealType: _mealType,
    meals: _meals,
    preferences: _preferences,
    userGoals: _userGoals,
    userGroceryLists: _userGroceryLists,
    userIntake: _userIntake,
    userMeals: _userMeals,
    users: _users,
    settings: _settings,
  }

}();
