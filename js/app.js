var appContainer = document.querySelector("#app-container");

var countryModel = Backbone.Model.extend({
  url: "",
  initialize: function(cVal){
    this.url = "https://restcountries.eu/rest/v1/alpha/"+cVal
  }
})

var CountriesCollection = Backbone.Collection.extend({
  url: '',
  initialize: function(rVal){
    this.url = 'https://restcountries.eu/rest/v1/region/' + rVal;
  }
})

var AppRouter = Backbone.Router.extend({
  routes: {
    "show-country/:countryName": 'showCountry',
    "show-region/:region" : "showCountriesByRegion",
    '': "showHomePage"
  },

  showCountriesByRegion : function(regionName){
    var countriesCollInstance = new CountriesCollection(regionName);
    countriesCollInstance.fetch().then(function(){
    console.log("server response: ", serverResponse);
    console.log('Backbone Collection', countriesCollInstance);
    countriesCollInstance.models.forEach(function(bbModl, i){
      console.log(bbModl);
      appContainer.innerHTML += "<p>" + bbModl.get('name') + '---' + '</p>';
      appContainer.innerHTML += bbModl.get('borders').forEach(function(brdrStr){
        appContainer.innerHTML += '<small>&nbsp' + borderStr + '</small>';
      })
      appContainer.innerHTML += "</hr>";
    })
  });
}

  // showCountry: function(countryName){
  //   appContainer.innerHTML = "<h1 class='bg-info'>" + countryName + "</h1>";
  //   var modelInstance = new countryModel(countryName);
  //   modelInstance.fetch().then(function(){
  //     var theCapital = modelInstance.get('capital');
  //     console.log(theCapital);
  //
  //   })
  // },

//   showHomePage: function(){
//     appContainer.innerHTML += "<input type='text'>"
//     appContainer.innerHTML += "<button class='btn btn-primary>Get Country<button>'"
//     document.querySelector('button').addEventListener('click', function(){
//       var inputElement = document.querySelector('#country-name');
//       window.location.hash = 'show-country/' + inputElement.value;
//       inputElement.value = '';
//     })
//   // console.log('routing to home');
//   // appContainer.innerHTML = "<h1> HOME </h1>";
//   // var modelInstance = new countryModel();
//   // modelInstance.fetch().then(function(serverResponse){
//   //   console.log(modelInstance);
//   // })
// },
//})
//
// window.addEventListener('load', function() {
//
//     var appRouter = new AppRouter();
//     console.log("Backbone ROUTING");
//     Backbone.history.start();
//     //keeps a log so as to go to previous hash on backspace
// })

var HomeView = Backbone.View.extend({
  el: '.content-area',

  events : {
    'click .get-country-btn': 'putInputValInHash'
  },

  builderHTMLTemplate: function(){
    var bigStr = "<h1> Search For a country </h1>";
    bigStr += "<input type='text' class='form-control' id='country-name'>";
    bigStr += "<button class='btn btn-primary get-country-btn'> Get Country Info </button>"

    return bigStr;
  },

  render: function(){
    this.el.innerHTML = this.builderHTMLTemplate()
    return this;
  }
})
