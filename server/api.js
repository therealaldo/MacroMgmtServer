'use strict';
const unirest = require('unirest');

let api = {

  searchRecipe(searchTerm) {
    //Setting searchedTerm to searchItem so that the parameter can be used.
    let url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?&query=" + searchTerm;
    //Searching for recipes
    unirest.get(searchURL + queryOpt + "&limitLicense=false&number=5&offset=0")
    .header("X-Mashape-Key", "DppGn3H1sjmshvSBxTfoQKsGPiWqp1AdVWgjsnGCnN7lReHSzd")
    .end(function (res) {
      return fetch(url).then((res) => res.json());
    });
  },
  //Finding Nutrients
  searchNutrients(recipeId) {
    let url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + recipeId + "/summary"
    unirest.get(url)
    .header("X-Mashape-Key", "DppGn3H1sjmshvSBxTfoQKsGPiWqp1AdVWgjsnGCnN7lReHSzd")
    .end(function(res) {
      return fetch(url).then((res) => res.json());
    });
  },
  //Getting recipe information
  getRecipeInfo(mealId) {
    let url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/156992/information?includeNutrition=true";
    unirest.get(url)
    .header("X-Mashape-Key", "DppGn3H1sjmshvSBxTfoQKsGPiWqp1AdVWgjsnGCnN7lReHSzd")
    .end(function(res) {
      return fetch(url).then((res) => res.json());
    });
  }
}
