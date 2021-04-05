var countryName = "Canada"; //hard-coded country name 
var countryCode = "ca"; //hard-coded country code
var apiKey = "cae4aa10ae68b4f113d12079116b3a90";
var apiUrl = `http://api.mediastack.com/v1/news`;//mediastack API URL
var newsAbout = "covid coronavirus";//keywords for the search
var queryPara = `?keywords=${newsAbout}&countries=${countryCode}&languages=en&sort=published_asc`;//query to get covid relted news associted with country code in ascending order
var newsInformation = [];

//function to make an API call to get the data
function makeApiCall(countryCode){

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

makeApiCall(countryCode);

function getInformation(info){

    for (var i = 0; i < info.data.length; i++){
        var newsData = {
            newsTitle: info.data[i].title.trim(), 
            newsUrl: info.data[i].url
        };
        newsInformation.push(newsData);
    }
    console.log("news information",newsInformation);
    covidNewsDisplay(newsInformation);
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

