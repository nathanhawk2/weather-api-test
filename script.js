var appid = '9d15bfb95f037f4d0dfe716379993d6a';
var q = '';
var textEl = $('#city-text');
var btnEl = $('#search-btn');
var weather = $('#display');
var pastCities = [];
var lastCity = [];
var displayButtons = [];

function Search(specific_cityname='') {
    let city_name = specific_cityname
    if (city_name == '') {
        city_name = document.getElementById('searchCity').value
    }
    var geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city_name}&appid=${appid}`;
    
    var toJSon = function(response) {
        return response.json();
    }
    
    fetch(geoURL)
        .then(toJSon)
        .then(function (locations) {
            var lat = locations[0].lat;
            var lon = locations[0].lon;
            var name = locations[0].name;
            var oneCall = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${appid}&units=imperial&exclude=hour,minutely`;

            fetch(oneCall)
                .then(toJSon)
                .then(function (data) {
                    data.name = name;
                    saveToLocalStorage(name);
                    CurrentDay(data);
                    clearFiveDayForecast();
                    for (var i = 0; i < 5; i++) {
                        getForecastForDay(data, i+1);
                    }
                    displayButtons();
                });
        });
};

var clearFiveDayForecast = function () {
    $('#fiveDay').html('');
}

var displayButtons = function () {
    var cities = JSON.parse(localStorage.getItem('cities')) || [];
    $("#cityButtons").html('');
    for (var city of cities) {
        var buttonEl = $('<input id="search" type="button"/>');
        buttonEl.val(city);
        buttonEl.attr('onClick', `Search('${city}');`);
        buttonEl.attr('class', "city-btn btn btn-success mb-3");
        $("#cityButtons").append(buttonEl);
    }
};

displayButtons();

// saves past searches to localstorage
var saveToLocalStorage = function (city) {
    pastCities = JSON.parse(localStorage.getItem('cities')) || [];
    if (pastCities.includes(city)) {
        return;
    }
    pastCities.push(city);
    var data = JSON.stringify(pastCities);
    localStorage.setItem('cities', data);
};

// changes time to m/d/y
function humanTime(newUnix) {
    return moment(newUnix, 'X').format('MM/DD/YYYY');
};

// five day forecast
function getForecastForDay(data, newDay) {
    var forecast = $("<div class='five-day-div'></div>");
    forecast.addClass("5-day-" + newDay);
    forecast.append("<p class='5day-temp'></p>");
    forecast.append("<p class='5day-date'></p>");
    forecast.append("<p class='5day-humidity'></p>");
    forecast.append("<p class='5day-wind'></p>");

    var newIcon = data.daily[newDay].weather[0].icon;
    var img = $("<img></img>");
    img.attr("src", `https://openweathermap.org/img/wn/${newIcon}@2x.png`);
    forecast.append(img);
    forecast.find(".5day-temp").html("Temp: " + data.daily[newDay].temp.day + "°F");
    forecast.find(".5day-date").html("" + (humanTime(data.daily[newDay].dt)));
    forecast.find(".5day-humidity").html("Humidity: " + data.daily[newDay].humidity + "%");
    forecast.find(".5day-wind").html("Wind: " + data.daily[newDay].wind_speed + " mph");

    $("#fiveDay").append(forecast);
};


// current day forecast
function CurrentDay(data) {
    var newIcon = data.daily[0].weather[0].icon;
    var img = $("<img></img>");
    img.attr("src", `https://openweathermap.org/img/wn/${newIcon}@2x.png`);
    $('.current-img').empty();
    $('.current-img').prepend(img);

    $('.current-date').html(data.name + ' ' + humanTime(data.current.dt));
    $('.current-temp').html('Temperature: ' + data.current.temp + '°F');
    $('.current-wind').html('Wind: ' + data.current.wind_speed + ' mph');
    $('.current-humidity').html('Humidity: ' + data.current.humidity + '%');
    $('.current-uv-index').html('UV Index: ' + data.current.uvi);
};