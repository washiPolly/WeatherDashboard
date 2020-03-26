// var citySearch = document.querySelector("#citySearch").value;
var resultsListSpan = document.querySelector("#resultsList");
var mainCardSpan = document.querySelector("#mainCard").textContent;

$("#submitBtn").on("click", function displayInfo(event) {
    event.preventDefault();
    // $(".row").empty();

    var citySearch = $("#citySearch").val().trim();
    console.log(citySearch);


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
            console.log(icon);
            var iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            var iconImage = $("<img>").attr("src", iconURL);
            iconImage.addClass("icon");
            $(".icon").css({
                "width": "50px",
            })
            var temp = response.list[0].main.temp;
            var humidity = response.list[0].main.humidity;
            var wind = response.list[0].wind.speed;
            var citLat = response.city.coord.lat;
            var cityLon = response.city.coord.lon;

            $("#mainCard").text(city);
            $("#mainCard").append(" (" + date + ")");
            $("#mainCard").append(iconImage);
            $("#mainCard").append("<br>" + "Temperature: " + temp + " °F");
            $("#mainCard").append("<br>" + "Humidity: " + humidity + "%");
            $("#mainCard").append("<br>" + "Wind Speed: " + wind +"   MPH");
            $("#mainCard").append("<br>" + "UV Index: " );

            var card = $("<div>").addClass("card").appendTo($("#resultsList"));

            //5-Day Forecase Cards
            for (var i = 8; i < 45 ; i+=8){
            var cardDiv = $("<div>").addClass("col s10 m4 l4").appendTo($("#forecast"));     
            var cardPanel = $("<div>").addClass("card-panel white z-depth-3").appendTo(cardDiv);     
            var cardSpan = $("<span>").addClass("green-text").appendTo(cardPanel);     
            cardSpan.attr("id","cardSpan");
            var forecastDay = response.list[i].dt_txt;
            var date = moment(forecastDay).format('MM/DD/YYYY');
            console.log(forecastDay);
            //icon list
            var icon = response.list[i].weather[0].icon;
            console.log(icon);
            var iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            var iconImage = $("<img>").attr("src", iconURL);
            iconImage.addClass("icon");
            $(".icon").css({
                "width": "50px",
            })
            var temp = response.list[i].main.temp;
            var humidity = response.list[i].main.humidity;
            

            cardSpan.html(" (" + date + ")" + "<br><br>" + "Temperature: " + temp + " °F" );
            $("#cardSpan").append(iconImage);



        }


        });      

});

// //API to get UV Index
// var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=30e1a5ef81aa152b5f387d986488443d&lat=" + cityLat + "&lon=" + cityLon 

// $.ajax({
//     url: uvURL,
//     method: "GET"
// })
// .then(function (response) {
//     var results = response.data;
//     console.log(response.value);

// });

