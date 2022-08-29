var appid = '692efab00ae66e9f48137e6ea4766fcd';
var q = 'Chicago';

var geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${q}&appid=${appid}`;
fetch(geoURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (locations) {
        var city = locations[0];
        console.log('LAT', city.lat);
        console.log('LON', city.lon);

        var oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&appid=${appid}&units=imperial`;

        fetch(oneCall)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
            });
    });

var displayButtons = function () {
    var cities = JSON.parse(localStorage.getItem('cities')) || [];
    for (var city of cities) {
        var buttonEl = document.createElement('button');
        buttonEl.textContent = city;
        buttonEl.className = "btn btn-success mb-3";
        searchForm.appendChild(buttonEl);
    }
};


var saveToLocalStorage = function (city) {
    var cities = JSON.parse(localStorage.getItem('cities')) || [];
    cities.push(city);
    var data = JSON.stringify(cities);
    localStorage.setItem('cities', data);
};