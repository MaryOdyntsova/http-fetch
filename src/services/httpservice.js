var Fetch = require('whatwg-fetch');
var baseUrl = 'http://localhost:6060';

var service = {
  get: function(url) {
      return fetch(baseUrl + url)  //hit the server
      .then(function(response){
        return response.json();
      })
  },
  post: function(url, ingredient) {
     return fetch(baseUrl + url, {
       headers: {
         "Accept": "text/plain",
         "Content-Type": "application/json"
       },
       method : "post",
       body: JSON.stringify(ingredient)
       //gonna take object and turn it to the JSON
     }).then(function(response){
       return response;
      })
     }
  }

module.exports = service;
