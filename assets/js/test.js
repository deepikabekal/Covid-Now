var button = document.querySelector("#search-btn");
var inputValue = document.querySelector("#search-city");
var confirmed = document.querySelector(".confirmed");
var recovered = document.querySelector(".recovered");
var deaths = document.querySelector(".deaths");


function countrySearch(event) {
  event.preventDefault();
  console.log("click");
  var countryName = inputValue.value;

  fetch(`https://covid-api.mmediagroup.fr/v1/cases?country=${countryName}`)
  .then(function(response) { 
    response.json() 
    .then(function(data) {
      console.log(data);

    // get array for confirmed, recovered, deaths   
    var allValue = data[`All`][`confirmed`]; 
    var recValue = data[`All`][`recovered`];
    var deathValue = data[`All`][`deaths`];


    //print data
    confirmed.innerHTML = allValue;
    recovered.innerHTML = recValue;
    deaths.innerHTML = deathValue;
    inputValue = "";

    });
  });
};

button.addEventListener("click", countrySearch);