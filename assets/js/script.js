//var input = document.querySelector('input_text');
//var confirmed = document.querySelector('.confirmed');
//var recovered = document.querySelector('.recovered');
//var deaths = document.querySelector('.deaths');
//var button = document.querySelector('.submit');
//var apiUrl = 'https://covid-api.mmediagroup.fr/v1'

var userFormE1 = document.querySelector("#user-form");
var nameInputE1 = document.querySelector("#countryname");


//button.addEventListener('click, Function()') {
// form submit
var formSubmitHandler = function(event) {
    event.preventDefault();

    var countryname = nameInputE1.value.trim();

    if (countryname) {
        getCovidData (countryname);
        nameInputE1.value= "";
    } else {
        alert("please enter a valid Country Name");
    }
    
};


// APi call for covid Data 
var getCovidData = function(country) {
    var apiUrl = "https://covid-api.mmediagroup.fr/v1/cases?country=" + countryname + ""

//fetch request

fetch(apiUrl)
.then(function(response) {
    response.json().then(function(data) {
    console.log(data);
    });
    });

};

userFormE1.addEventListener("submit", formSubmitHandler);

