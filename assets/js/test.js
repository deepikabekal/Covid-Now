var button = document.querySelector("#search-btn");
var inputValue = document.querySelector("#search-city");
var confirmed = document.querySelector(".confirmed");
var recovered = document.querySelector(".recovered");
var deaths = document.querySelector(".deaths");
var counName = document.querySelector("#country-search-term")


//Function to call API

function countrySearch(event) {
  event.preventDefault();
  console.log("click");
  var countryName = inputValue.value;

// Need to Add Error checking

// API fetch with countryName as dynamic user generated variable 

  fetch(`https://covid-api.mmediagroup.fr/v1/cases?country=${countryName}`)
  .then(function(response) { 
    response.json() 
    .then(function(data) {
      console.log(data);

    // get array for confirmed, recovered, deaths   
    var counValue = countryName;  
    var allValue = data[`All`][`confirmed`]; 
    var recValue = data[`All`][`recovered`];
    var deathValue = data[`All`][`deaths`];


    //print data
    
    counName.innerHTML =  counValue
    confirmed.innerHTML = allValue;
    recovered.innerHTML = recValue;
    deaths.innerHTML = deathValue;
    inputValue = "";

    });
  });
};


button.addEventListener("click", countrySearch);