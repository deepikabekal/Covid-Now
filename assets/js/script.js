// var countryName = "Canada"; //hard-coded country name 
// var countryCode = "ca"; //hard-coded country code
var newsAbout = "covid";//keywords for the search
var apiUrl = `https://covid-19-news.p.rapidapi.com/v1/covid?`;//covid news API URL
var searchHistory = [];


//event listeners for button click

$("nav").on("click", "button", function(){
    var btnText = $(this).text();
    if (btnText==="World"){
        covidApiCall(btnText);
        worldNewsApiCall();
    } else {
        covidApiCall(btnText);
    }
    
    $("#nav-page-container").removeClass("hidden");
    
    
})



// Covid Data Variables 
var button = document.querySelector("#search-btn");
var confirmed = document.querySelector(".confirmed");
var recovered = document.querySelector(".recovered");
var deaths = document.querySelector(".deaths");
var counName = document.querySelector("#country-search-term");
var countryCode = document.querySelector(".country-code");

//Function to call API Covid Data 

function countrySearch(event) {
    var inputValue = document.querySelector("#search-city");
    var countryName = inputValue.value;
   // var countryCode = inputValue.value;
    event.preventDefault();
    console.log("click");
    $(".news-display").empty();
    covidApiCall(countryName);
  
}
  // Need to Add Error checking
  
  // API fetch with countryName as dynamic user generated variable 
function covidApiCall(countryName){
    fetch(`http://covid-api.mmediagroup.fr/v1/cases?country=${countryName}`)
    .then(function(response) { 
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        console.log(countryName);
        getCovidData(data,countryName);
        
    })    
  
    // .catch(function(error) {
    //     alert("unable to connect to Covid Data");
    // })
}
function getCovidData(data,countryName){
    
        var counValue,allValue,recValue,deathValue,countryCode
        if(data.All) { //if the data.All property works, data contains a COUNTRY object.
          counValue = countryName;  
          allValue = data[`All`][`confirmed`]; 
          recValue = data[`All`][`recovered`];
          deathValue = data[`All`][`deaths`];
          countryCode =data[`All`][`abbreviation`];
          covidObject = {country:countryName, countryCodeV:countryCode, confirmedCase:allValue, recoveredCase:recValue, deathCase:deathValue};
          
        } else { //if there's no "All" property... we might have to dig in and find the right country.
          counValue = countryName;  
          allValue = data[`countryName`][`confirmed`]; 
          recValue = data[`countryName`][`recovered`];
          deathValue = data[`countryName`][`deaths`];
          countryCode =data[`countryName`][`abbreviation`];
          covidObject = {country:countryName, countryCodeV:countryCode, confirmedCase:allValue, recoveredCase:recValue, deathCase:deathValue};
          
        }
        console.log(countryCode);
  
      //print data to <p> tags in div 
      
      counName.innerHTML =  counValue;
      confirmed.innerHTML = allValue;
      recovered.innerHTML = recValue;
      deaths.innerHTML = deathValue;
      inputValue = "";
  
      makeApiCall(countryCode);
      saveSearchHistory(countryName,covidObject);
  
}

// MediaStack Starts

//function to make an API call to get the data 
function makeApiCall(countryCode){
    var queryPara = `?keywords=${newsAbout}&countries=${countryCode}&sort=published_asc`;//query to get covid relted news associted with country code in ascending order
    fetch(apiUrl+queryPara+`&access_key=${apiKey}`)
    .then(function(reponse){
        return reponse.json();
    })
    .then(function(data){
        console.log("data",data);   
        getInformation(data);        
    })
    .catch(function(error){
        console.log("error",error);
        var errorMsg = "Sorry! There is no COVID-19 news related to this country."
        var divTag = $("<div></div>");
        divTag.attr("id", "error-div");
        var headingEl = $("<h2></h2>").text("Latest News");
        var errorPTag = $("<p></p>").text(errorMsg);
        $(".news-display").append(divTag);
        $(divTag).append(headingEl);
        $(divTag).append(errorPTag);

    })
}

// makeApiCall(countryCode);

function getInformation(info){
    var newsInformation = [];
    for (var i = 0; i < info.data.length; i++){
        var newsData = {
            newsTitle: info.data[i].title.trim(), 
            newsUrl: info.data[i].url
        };
        newsInformation.push(newsData);
    }
    console.log("news information",newsInformation);
    if (newsInformation.length===0){

        var errorMsg = "Sorry! There is no COVID-19 news related to this country."
        var divTag = $("<div></div>");
        divTag.attr("id", "error-div");
        //var headingEl = $("<h2></h2>").text("Latest News:");
        var errorPTag = $("<p></p>").text(errorMsg);
        $(".news-display").append(divTag);
        $(divTag).append(headingEl);
        $(divTag).append(errorPTag);

    } else {
    covidNewsDisplay(newsInformation);
    }
    
}




//function to display news articles
function covidNewsDisplay(newsInformation){

    //display heading for the section
    $(".news-display").append(
        `
        <div>
        <h2>Latest News:</h2>
        </div>
        <div class="news-links"></div>
        `
    );
    //console.log(newsInformation.length)
    //display news links
    for(var i=0;i<newsInformation.length;i++){
        var divTag = $("<div></div>");
        var pTag = $("<p></p>")
        var aTag = $("<a></a>").attr("href",newsInformation[i].newsUrl);
        aTag.text(newsInformation[i].newsTitle);
        $(".news-links").append(divTag);
        $(divTag).append(pTag);
        $(pTag).after(aTag);
        
        // $(".news-links").append(
        //      `
        //      <div>
        //      <p>
        //      <a href=${newsInformation[i].newsUrl}>${newsInformation[i].newsTitle}</a>
        //      </p>
        //      </div>
        //      `
        //  )

    }
    
}

button.addEventListener("click", countrySearch);

function saveSearchHistory(countryName,covidObject){
    searchHistory = JSON.parse(localStorage.getItem("covidNow")) || [];
    console.log(searchHistory);

    
    if (searchHistory!==[]){
        for (var i=0; i<searchHistory.length;i++){
            if(countryName.toLowerCase()===searchHistory[i].country.toLowerCase()){
                searchHistory.splice(i,1);
            }
        }
    }

    searchHistory.push(covidObject);
    console.log("coid object", covidObject);
    console.log("last search History", searchHistory);

    localStorage.setItem("covidNow",JSON.stringify(searchHistory));

    displaySearchHistory();

}

function displaySearchHistory(){
    $("#search-history").empty();
    $("#search-city").val("");
    var searchHistory = JSON.parse(localStorage.getItem("covidNow")) || [];
    console.log(searchHistory.length);
    for (var i=0; i<searchHistory.length; i++){
        var optionTag = $("<option></option>");
        optionTag.text(searchHistory[i].country);
        console.log(optionTag);
        $("#search-history").append(optionTag);
    } 
}

