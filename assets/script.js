var searchBtn = $("#searchBtn");
var searchInput = $("#searchInput");
var fiveDay = $("#fiveDay");
var oneDay = $("#oneDay")
var colEl = $(".col")
var divEl = $("#divEl")
var forecast = $("#forecast")
var currentEl = $("#currentEl")

var forecastDate = {};
var weatherIcon = {};
var temp = {};
var humidity = {};
var windSpeed = {};
var chanceRain = {};
var rainVol = {};


var currentDate = moment().format('L');

searchBtn.on("click",function(){
    
    // userInput = saveSearch.val();
    //localStorage.setItem("location", JSON.stringify(userInput.toLowerCase()));
    retrieveLocation();
    saveCitySearch();
})

function retrieveLocation(l) {
    function currentWeather(){
        var location = searchInput.val();
        
        var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&units=imperial&appid=f5ca5829ecc4bf04f1d13831ce88f110";
        
        fetch(weatherUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(response) {
            cityName = response.city.name;
            currentWeatherIcon = response.list[0].weather[0].icon;
            currentTemp = response.list[0].main.temp;
            currentHumidity = Math.floor(response.list[0].main.humidity);
            currentChanceRain = Math.floor(response.list[0].pop * 100);
            currentWindSpeed = response.list[0].wind.speed;
        
            console.log(currentWeatherIcon);
            var colClass = $("<div>").attr("class", "col")
            oneDay.append(colClass)
            var cardClass = $("<div>").attr("class", "card").attr("style", "width: 25rem;").attr("id", "cardId")
            colClass.append(cardClass)
             var newCity = $("<h3>").attr("class", "card-header").text(cityName)
            cardClass.append(newCity);
            var cBody = $("<div>").attr("class", "card-body")
            cardClass.append(cBody)
           
            
            var iconP = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + currentWeatherIcon + "@2x.png");
            cBody.append(iconP)
            var tempP1 = $("<p>").text("Temperature: " + currentTemp + "F");
            cBody.append(tempP1)
            var humP = $("<p>").text("Humidity: " + currentHumidity + "%");
            cBody.append(humP)
            var curRain = $("<p>").text("Chance of Rain: " + currentChanceRain + "%");
            cBody.append(curRain)
            var windP = $("<p>").text("Wind Speed: " + currentWindSpeed + "MPH");
            cBody.append(windP);

            var newH2 = $("<h2>").text("5-Day Forecast: ");
            fiveDay.append(newH2)

            for (var i = 0; i < 40; i += 8){
                forecastDate[i] = response.list[i].dt_txt;
                weatherIcon[i] = response.list[i].weather[0].icon;
                temp[i] = Math.floor(response.list[i].main.temp);
                humidity[i] = Math.floor(response.list[i].main.humidity);
                windSpeed[i] = Math.floor(response.list[i].wind.speed);
                chanceRain[i] = Math.floor(response.list[i].pop);
                
                
                var cardDiv = $("<div>").attr("class", "card").attr("style", "width: 20rem;")
                forecast.append(cardDiv)
                var newH3 = $("<h3>").attr("class", "card-header").text(moment(forecastDate[i]).format("dddd   " + "M" + "/" + "D"));
                cardDiv.append(newH3);
                var cardBodyDiv =$("<div>").attr("class", "card-body")
               cardDiv.append(cardBodyDiv)
                
                var newIcon = $("<img>").attr("class", "card-text").attr("src", "https://openweathermap.org/img/wn/" + weatherIcon[i] + "@2x.png");
                cardBodyDiv.append(newIcon);
                var tempP = $("<p>").attr("class", "card-text").text("Temperature: " + temp[i] + "F");
                cardBodyDiv.append(tempP);
                var rainChanceP = $("<p>").attr("class", "card-text").text("Chance of Rain: " + chanceRain[i] * 100 + "%");
                cardBodyDiv.append(rainChanceP);
                var newHum = $("<p>").attr("class", "card-text").text("Humidity: " + humidity[i] + "%");
                cardBodyDiv.append(newHum)
                var newWind = $("<p>").attr("class", "card-text").text("Wind Speed: " + windSpeed[i] + " MPH");
                cardBodyDiv.append(newWind);
        
            }
            
        })
    }
    currentWeather();
    
}
function saveCitySearch(location){

    console.log(location);
};
