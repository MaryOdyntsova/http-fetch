var Reflux = require('reflux');

var Actions = Reflux.createActions([
  'getIngredients',
  'postIngredients'
]);

module.exports = Actions;

//getIngredients, postIngredient - actions to the project, tied to HTTP requests
