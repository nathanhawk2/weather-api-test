var appid = '9d15bfb95f037f4d0dfe716379993d6a';
var q = '';
var textEl = $('#city-text');
var btnEl = $('#search-btn');
var pastCity = [];
var displayButtons = [];
var weather = $('#display');
var search = $('#searchCity');

function search(search) {
    search.preventDefault
    var q = search;
    var geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${q}&appid=${appid}`;
    fetch(geoURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (locations) {
        var city = locations[0];
        console.log('LAT', city.lat);
        console.log('LON', city.lon);
        var getName = data[0].name;
        
        var oneCall = `https://api.openweathermap.org/data/3.0/onecall?lat=${city.lat}&lon=${city.lon}&appid=${appid}&units=imperial&exclude=hour,minutely`;
        
        fetch(oneCall)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            SaveEntry(getName);
            weatherDisplay.css('display', 'block');
            CurrentDay(data);
            for(var i = 0; i < 6; i++){
                fiveDayForecast(data, i);
            };
        });
    });
};
    
var displayButtons = function () {
    var cities = JSON.parse(localStorage.getItem('cities')) || [];
    for (var city of cities) {
        var buttonEl = document.createElement('button');
        buttonEl.textContent = city;
        buttonEl.className = "btn btn-success mb-3";
        searchForm.appendChild(buttonEl);
    }
};
displayButtons();

var saveToLocalStorage = function (city) {
    var cities = JSON.parse(localStorage.getItem('cities')) || [];
    cities.push(city);
    var data = JSON.stringify(cities);
    localStorage.setItem('cities', data);
};


function fiveDayForecast( data, newDay){
    var newIcon = data.daily[newDay].weather[0].icon;
    var getImage = $(".5-day-" + newDay).find(".5day-image");
    getImage.attr("src", `https://openweathermap.org/img/wn/${newIcon}@2x.png`);
    getImage.attr("height", "40px");
    $(".5-day-" + newDay).find(".5day-temp").html("Temp: " + data.daily[newDay].temp.day + "°F");
    $(".5-day-" + newDay).find(".5day-date").html("" + (humanTime(data.daily[newDay].dt)));
    $(".5-day-" + newDay).find(".5day-humidity").html("Temp: " + data.daily[newDay].humidity + "%");
    $(".5-day-" + newDay).find(".5day-wind").html("Wind: " + data.daily[newDay].wind_speed + " mph");
};

function humanTime(newUnix){
    return moment(newUnix, 'X').format('MM/DD/YYYY');
};