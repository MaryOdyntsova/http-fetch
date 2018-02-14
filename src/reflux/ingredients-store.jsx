var HTTP = require('../services/httpservice');
var Reflux = require('reflux');
var Actions = require('./actions.jsx');

var IngredientStore = Reflux.createStore({
  listenables: [Actions], //listen to the actions in Actions

  //getIngredient is taken from Actions store same postIngredient
  getIngredients: function() {
    HTTP.get('/ingredients')
    .then(function(data) {
        this.ingredients = data;
        this.fireUpdate(); //notificate the data was update
    }.bind(this));
  },
  postIngredients: function(text) {
    //Posted ingredient to the SERVER
    //niw we got a successfull callback
    if (!this.ingredients) {
      this.ingredients = []; //safety ckeck that there are was no
      // ingtredients created in the object
    }

    var ingredient = {
      "text": text, //key
      "id": Math.floor(Date.now() / 1000) + text
    }

    this.ingredients.push(ingredient);
    this.fireUpdate();

    HTTP.post('/ingredients', ingredient)
    .then(function(response){
      this.getIngredients();
      //after the page reloading the posted ingredient will be saved
    }.bind(this));
  },

  //refresh function
  //мы собираемся запускать, когда хотим обновить данные
  //this referes to the stores so all listenables will be notified
  fireUpdate: function() {
      this.trigger('change', this.ingredients); //trigger reserved function
      //'change' is the type of change
  }
});

module.exports = IngredientStore;
