

var userFormE1 = document.querySelector("#user-form");
var nameInputE1 = document.querySelector("#countryname");
var dataContainerE1 = document.querySelector("#data-container")
var countrySearchTerm = document.querySelector("#country-search-term")


//button.addEventListener('click, Function()') {
// form submit
var formSubmitHandler = function(event) {
    event.preventDefault();

    var countryname = nameInputE1.value.trim();

    if (countryname) {
        getCovidData (countryname);

        nameInputE1.value= "";
    } else {
        alert("Please Enter a valid Country Name");
    }
    
};


// APi call for covid Data 
var getCovidData = function(country) {
    var apiUrl = "https://covid-api.mmediagroup.fr/v1/cases?country=" + countryname + ""

//fetch request

fetch(apiUrl)
.then(function(response) {
    response.json().then(function(data) {
    displayCountrys(data, country);
    });
    });

};

var displayCountrys = function(country) {
    console.log(country);
   

    //loop thru arrays to return information for country name 
    // within country name = All -> confirmed / recovered / deaths 
    //user input variable get link  for API 
    

};

userFormE1.addEventListener("submit", formSubmitHandler);

