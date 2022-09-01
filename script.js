var appid = '692efab00ae66e9f48137e6ea4766fcd';
var q = document.querySelector('#q');

var searchEL = document.querySelector('#search');
searchEL.addEventListener('click', searchWeather);

function searchWeather(event) {
    event.preventDefault();
    var geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${q.value}&appid=${appid}`;
    fetch(geoURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (locations) {
            var city = locations[0];
            console.log('LAT', city.lat);
            console.log('LON', city.lon);

            var oneCall = `https://api.openweathermap.org/data/3.0/onecall?lat=${city.lat}&lon=${city.lon}&appid=${appid}&units=imperial`;

            fetch(oneCall)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data)
                    displayButton();
                });

        });

}

var displayButton = function () {
    var searchHistory = []
    var pastSearch = JSON.parse(localStorage.getItem('search-terms'))
    if (pastSearch) {
        searchHistory = pastSearch
    }
    searchHistory.push(value)

    localStorage.setItem('search-terms', JSON.stringify(searchHistory))
    var buttonEl = document.createElement('button');
    buttonEl.textContent = q.value;
    buttonEl.className = "btn btn-success mb-3";
    document.querySelector('#searchedCities').appendChild(buttonEl);
};

var recButtons = function () {
    var pastSearch = JSON.parse(localStorage.getItem('search-terms'))
    for (i = 0; i < pastSearch.length; i++) {
        var buttonEl = document.createElement('button');
        buttonEl.textContent = pastSearch[i];
        buttonEl.className = "btn btn-success mb-3";
        document.querySelector('#searchedCities').appendChild(buttonEl);
    }
}
recButtons();

// add event listener to this button to search based off the text of the button
// refactor search weather function 

var weatherButtons = function () {
    for (i = 1; i < current.daily - 2; i++)
        console.log(current.daily[i])
}