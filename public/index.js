var makeRequest = function(url, callback){
  // create new XHR  (XMLHttpRequest() is built into JavaScript)
  var request = new XMLHttpRequest();

  // Open the request, passing in the HTTP request type, and the URL
  request.open("GET", url);

  // Write an event listener for the request
  // when the response has loaded do something - the callback
  request.addEventListener("load", callback);

  // Do it!
  request.send();

};


var requestComplete = function(){
  // check response status
  if (this.status != 200) return;

  // parse responseText
  var jsonString = this.responseText;

  // parse responseText
  var countries = JSON.parse(jsonString);

  populateList(countries);

  populateSelect(countries);

};

var populateList = function(countries){
  // get the country list ul (by Id from the html)
  var ul = document.getElementById('country-list');

  for (var country of countries){
    // new li
    var li = document.createElement('li');
    // get country name and amend li innerText
    li.innerText = country.name;
    // append li to ul
    ul.appendChild(li);
  }
}

var populateSelect = function(countries){
  var countriesSelect = document.getElementById('select-countries');

  var option = document.createElement('option');
  option.innerText = "Please select a country";
  option.disabled = true;
  option.selected = true;
  countriesSelect.appendChild(option);

  for (var country of countries){
    var option = document.createElement('option');
    option.innerText = country.name;
    countriesSelect.appendChild(option);
  }
}

var removeChildren = function(node){
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
}

var displayCountryDetails = function(selectedCountry){

}


var app = function(){
  var showCountriesButton = document.getElementById('button-show-countries');
  showCountriesButton.addEventListener('click', function(){
    // disable the button after click ('this' is the button that was clicked)
    this.disabled = "disabled";
    // set url
    var url = "https://restcountries.eu/rest/v2/all";
    // make request
    makeRequest(url, requestComplete);

    var countriesSelect = document.getElementById('select-countries');
    countriesSelect.addEventListener('change', function(){
      var selectedCountry = countriesSelect.innerText;
      var countryList = document.getElementById('country-list');
      removeChildren(countryList);
      displayCountryDetails(selectedCountry);
    });
  });
}

window.addEventListener('load', app);
