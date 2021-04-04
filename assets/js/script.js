

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
        alert("Please Enter a valid Country Name");
    }
    
};


// APi call for covid Data 
var getCovidData = function(country) {
    var apiUrl = `https://covid-api.mmediagroup.fr/v1/cases?country=Canada` 

//fetch request

fetch(apiUrl) 
.then(response => response.json())
.then(data => { console.log(data);

 //       var confirmed = data[];
 //       var recovered = data[];
 //       var deaths = data[];

//  confirmed.innerHTML = 
//  recovered.innerHTML = 
//  deaths.innerHTML = 
//  input.value ="";

 })
};

userFormE1.addEventListener("submit", formSubmitHandler);

