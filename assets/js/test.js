var userFormE1 = document.querySelector("#user-form");
var nameInputE1 = document.querySelector("#countryname");


var formSubmitHandler = function(event) {
    event.preventDefault();
    console.log(event);

var countryName = nameInputE1.value.trim();

if (countryName) {
    getCovidData =(countryName);
    nameInputE1.value="";
} else {
    alert("please enter a valid Country Name");
}

};

var getCovidData = function(country) {
    var apiUrl = "https://api.covid19api.com/summary"

    //fetch request
fetch(apiUrl).then(function(response){
    response.json().then(function(data) {
        console.log(data);
    });
});
};
    

userFormE1.addEventListener("submit", formSubmitHandler);
