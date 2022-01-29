var formEl = $('#city_form');
var cityNameEl = $('input[name = "cityName"]');

var cityName;
var lattitude;
var longitude;




function handleFormSubmit(event){
    event.preventDefault();
    console.log("Name of city submitted is " + cityNameEl.val());
    cityName = cityNameEl.val();
    $('input[name = "cityName"]').val(' ');
    
    handleCityName(cityName);
};



formEl.on('submit', handleFormSubmit);

function handleCityName(cityName){
    console.log("Name of city submitted is " + cityName);

    var geolocatorRequestURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&appid=93f009b07cdf38e8e5c9ff73cea6126b';
    fetch(geolocatorRequestURL)
    .then(function (response) {
        return response.text();
    })
    .then(function (data) {

        data = JSON.parse(data);
        var lattLong = data[0];

        lattitude = lattLong.lat;
        longitude = lattLong.lon;
        console.log("latt is " + lattitude);
        console.log("long is " + longitude);

        var weatherRequestURL = 'http://api.openweathermap.org/data/2.5/onecall?lat='+lattitude+'&lon='+longitude+'&exclude=hourly,daily,alerts,minutely&units=metric&appid=93f009b07cdf38e8e5c9ff73cea6126b';
        fetch(weatherRequestURL)
        .then (function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            console.log("temp is " + data.current.temp + " C");
            console.log("wind is " + data.current.wind_speed + " KM/H");
            console.log("humidity is " + data.current.humidity +"%");
            console.log("UV index is " + data.current.uvi);

            var fiveDayURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lattitude + "&lon=" + longitude + "&units=metric&exclude=current,minutely,hourly,alerts&appid=93f009b07cdf38e8e5c9ff73cea6126b";
            fetch(fiveDayURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log("data from 5 day forecast is");
                    console.log(data);

                    console.log("data from daily[0] is");
                    console.log(data.daily[0]);

                    console.log("data from daily[0].temp.day is");
                    console.log(data.daily[0].temp.day);
                })
        })
    })

    
}