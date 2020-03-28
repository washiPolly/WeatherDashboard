$(document).ready(function(){

var resultsListSpan = document.querySelector("#resultsList");
var mainCardSpan = document.querySelector("#mainCard").textContent;
var autoGenCards;
var history = window.localStorage.getItem("eachCity");


$("#submitBtn").on("click", function displayInfo(event) {
    event.preventDefault();
    
    var citySearch = $("#citySearch").val().trim();
    console.log(citySearch);
    


    //create a empty array
    var history = [];
    //push each searched city into history
    history.push(citySearch);
    //set each history to local storage
    window.localStorage.setItem("history", history);
     

    searchWeather(citySearch);
    createPanel(citySearch);

    });


    function searchWeather(citySearch){
    var cityLat; 
    var cityLon; 
    
    
    
       var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&units=imperial&uvi?&appid=30e1a5ef81aa152b5f387d986488443d"

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function (response) {
            var results = response.data;
            console.log(response);
            console.log(response.list[0].dt_txt)
            
            var city = response.city.name;
            var today = response.list[0].dt_txt;
            var date = moment(today).format('MM/DD/YYYY');
            //icon list
            var icon = response.list[0].weather[0].icon;
            var iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            var iconImage1 = $("<img>").attr("src", iconURL);
            iconImage1.addClass("icon");
            var temp = response.list[0].main.temp;
            var humidity = response.list[0].main.humidity;
            var wind = response.list[0].wind.speed;
            cityLat = response.city.coord.lat;
            cityLon = response.city.coord.lon;
            uvFunction(cityLat, cityLon);

            var p0 = $("<p>").addClass("cardCityText").text(city);
            var p1 = $("<p>").addClass("cardDate1Text").text(" ("+ date + ")");
            
            

            $("#mainCard").append(p0, p1, iconImage1);
            // $("#mainCard").append(" (" + date + ")", iconImage);
            // // $("#mainCard").append(iconImage);
            $("#mainCard").append("<br>" + "Temperature: " + temp + " °F");
            $("#mainCard").append("<br>" + "Humidity: " + humidity + "%");
            $("#mainCard").append("<br>" + "Wind Speed: " + wind +"   MPH" );
            

            var card = $("<div>").addClass("card").appendTo($("#resultsList"));

            //5-Day Forecase Cards
            $(".fiveDay").text("5-Day Forecast");
            for (var i = 7; i < 40 ; i+=7){
            var cardDiv = $("<div>").addClass("col").appendTo($("#forecast"));     
            var cardPanel = $("<div>").addClass("card-panel teal lighten-4 white z-depth-3").appendTo(cardDiv);     
            cardPanel.attr("id","autoGenCards");
            var cardSpan = $("<span>").addClass("white-text").appendTo(cardPanel);     
            cardSpan.attr("id","cardSpan");
            var forecastDay = response.list[i].dt_txt;
            var date = moment(forecastDay).format('MM/DD/YYYY');
            console.log(forecastDay);
            //icon list
            var icon = response.list[i].weather[0].icon;
            var iconURL = "http://openweathermap.org/img/wn/" + icon + ".png"
            var iconImage = $("<img>").attr("src", iconURL);
            iconImage.attr("id","icon");

            var temp = response.list[i].main.temp;
            var humidity = response.list[i].main.humidity;
            var p0 = $("<p>").addClass("cardDateText").text(date);
            var p1 = $("<p>").addClass("cardTempText").text("Temp: " + temp + " °F");
            var p2 = $("<p>").addClass("cardHumidText").text("Humidity: " + humidity);
            
            

            cardSpan.append(p0, iconImage, p1, p2);
        }
        

        });      
        
    }
                       
               
            




function createPanel(citySearch){
    console.log(citySearch);
    var s0 = $("<p>").addClass("input").text(citySearch);
    var searchPanel = $("<div>").addClass("card-panel teal lighten-4").appendTo($(".input-field"));     
    searchPanel.attr("data-save","searchedCity");
}




function uvFunction(lat, lon){
    
//API to get UV Index
var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=30e1a5ef81aa152b5f387d986488443d&lat=" + lat + "&lon=" + lon 

$.ajax({
    url: uvURL,
    method: "GET"
})
.then(function (response) {
    var results = response.data;
    var uvIndex = response.value;
    var p3 = $("<p>").addClass("cardUVText").text("UV Index: ");
    var uvClass = $("<span>").addClass("uvIndex").text(uvIndex);
    p3.append(uvClass);

    // $("#mainCard").append("<br>" +  uvClass);
    $("#mainCard").append(p3);
    
        // setting uvClass for color coding
        if(uvIndex <= 2){
            uvClass.addClass("uvFav");
        } else if (uvIndex >= 3 || uvIndex <= 5){
            uvClass.addClass("uvMod")
        } else {
            uvClass.addClass("uvSev")
        }
      

 

  
   

    




});





};



// $("#submitBtn").on("click", function saveSearch(event) {
//     event.preventDefault();
    
// });

    //adding clear function to search box
    var clearButton = document.getElementById('clear')
    var myInput = document.getElementById('citySearch')

    myInput.addEventListener('input', function(){
        if(this.value != "") clearButton.style.opacity = 1
        else clearButton.style.opacity = 0
    });
    
    clearButton.addEventListener('click', function(){
        myInput.value = "";
        this.style.opacity = 1
    });

    //clearing function to previous card inputs
    var mainCardClear = document.getElementById('mainCard');
    var autoGenCards = document.getElementById('forecast');
    var reSubmitBtn = document.getElementById('submitBtn');

      
    reSubmitBtn.addEventListener('click', function(){
        mainCardClear.innerHTML = "";
        autoGenCards.innerHTML = "";
     
        console.log($("#autoGenCards"))
    });


});