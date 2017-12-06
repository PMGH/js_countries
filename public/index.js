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

  // debugger;
}

var populateSelect = function(countries){
  var select = document.getElementById('select-countries');

  var option = document.createElement('option');
  option.innerText = "Please select a country";
  option.disabled = true;
  option.selected = true;
  select.appendChild(option);

  for (var country of countries){
    var option = document.createElement('option');
    option.innerText = country.name;
    select.appendChild(option);
  }
}


var app = function(){
  // set url
  var url = "https://restcountries.eu/rest/v2/all";
  // make request
  var countries = makeRequest(url, requestComplete);

  var showCountriesButton = document.getElementById('button-show-countries');
  showCountriesButton.addEventListener('click', function(){
    // disable the button after click ('this' is the button that was clicked)
    this.disabled = "disabled";
    // set url
    var url = "https://restcountries.eu/rest/v2/all";
    // make request
    makeRequest(url, requestComplete);
  });
}

window.addEventListener('load', app);
