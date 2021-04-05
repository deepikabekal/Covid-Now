var button = document.querySelector("#search-btn");
var confirmed = document.querySelector(".confirmed");
var recovered = document.querySelector(".recovered");
var deaths = document.querySelector(".deaths");
var counName = document.querySelector("#country-search-term")


//Function to call API

function countrySearch(event) {
  var inputValue = document.querySelector("#search-city");
  var countryName = inputValue.value;
  event.preventDefault();
  console.log("click");


// Need to Add Error checking

// API fetch with countryName as dynamic user generated variable 

  fetch(`https://covid-api.mmediagroup.fr/v1/cases?country=${countryName}`)
  .then(function(response) { 
    if (response.ok) {
    response.json() 
    .then(function(data) {
      console.log(data);

      var counValue,allValue,recValue,deathValue
      if(data.All){ //if the data.All property works, data contains a COUNTRY object.
        counValue = countryName;  
        allValue = data[`All`][`confirmed`]; 
        recValue = data[`All`][`recovered`];
        deathValue = data[`All`][`deaths`];
      } else { //if there's no "All" property... we might have to dig in and find the right country.
        counValue = countryName;  
        allValue = data[countryName][`confirmed`]; 
        recValue = data[countryName][`recovered`];
        deathValue = data[countryName][`deaths`];
      }


    //print data
    
    counName.innerHTML =  counValue;
    confirmed.innerHTML = allValue;
    recovered.innerHTML = recValue;
    deaths.innerHTML = deathValue;
    inputValue = "";

    });
  } else {
    alert("Error: " + response.statusText);
  }
  }) 
.catch(function(error) {
  alert("unable to connect to Covid Data");
});
};


button.addEventListener("click", countrySearch);