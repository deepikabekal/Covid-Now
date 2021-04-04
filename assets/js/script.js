var countryName = "Canada"; //hard-coded country name 
var countryCode = "ca"; //hard-coded country code
var apiKey = "cae4aa10ae68b4f113d12079116b3a90";
var apiUrl = `http://api.mediastack.com/v1/news`;//mediastack API URL
var newsAbout = "covid coronavirus";//keywords for the search
var queryPara = `?keywords=${newsAbout}&countries=${countryCode}&languages=en&sort=published_asc`;//query to get covid relted news associted with country code in ascending order

//function to make an API call to get the data
function makeApiCall(countryCode){

    fetch(apiUrl+queryPara+`&access_key=${apiKey}`)
    .then(function(reponse){
        return reponse.json();
    })
    .then(function(data){
        console.log(data);        
        
    })
}

makeApiCall(countryCode);


