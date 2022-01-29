var formEl = $('#city_form');
var cityNameEl = $('input[name = "cityName"]');
var todaysTempEl = $('#todayTemp');
var todaysWindEl = $('#todayWind');
var todaysHumidEl = $('#todayHumid');
var todaysUvEl = $('#todayUV');

var cardOneTempEl = $('#cardOneTemp');
var cardOneWindEl = $('#cardOneWind');
var cardOneHumidEl = $('#cardOneHumid');
var cardOneUVEl = $('#cardOneUV');

var cardTwoTempEl = $('#cardTwoTemp');
var cardTwoWindEl = $('#cardTwoWind');
var cardTwoHumidEl = $('#cardTwoHumid');
var cardTwoUVEl = $('#cardTwoUV');

var cardThreeTempEl = $('#cardThreeTemp');
var cardThreeWindEl = $('#cardThreeWind');
var cardThreeHumidEl = $('#cardThreeHumid');
var cardThreeUVEl = $('#cardThreeUV');

var cardFourTempEl = $('#cardFourTemp');
var cardFourWindEl = $('#cardFourWind');
var cardFourHumidEl = $('#cardFourHumid');
var cardFourUVEl = $('#cardFourUV');

var cardFiveTempEl = $('#cardFiveTemp');
var cardFiveWindEl = $('#cardFiveWind');
var cardFiveHumidEl = $('#cardFiveHumid');
var cardFiveUVEl = $('#cardFiveUV');

var dateOneEl = $('#dayOneDate');
var dateTwoEl = $('#dayTwoDate');
var dateThreeEl = $('#dayThreeDate');
var dateFourEl = $('#dayFourDate');
var dateFiveEl = $('#dayFiveDate');

var cityButtons = $('#citiesList');
var icon1El = $('icon1El');



var cityName;
// var cities = localStorage

var cities = [];
var index = 0;




function handleFormSubmit(event){
    event.preventDefault();
    console.log("Name of city submitted is " + cityNameEl.val());
    cityName = cityNameEl.val();

    console.log("about to enter local sotrage if else...");
 

    
    if (!localStorage.getItem("index"))
    {
        cities[index] = cityName;
        index++;
        // cities.push(cityName);
        console.log("local storage for cities is empty");
        localStorage.setItem("cities", JSON.stringify(cities));
        localStorage.setItem("index", JSON.stringify(index));
    }

    else{
        index = JSON.parse(localStorage.getItem("index"));
        console.log("local storage for cities is not empty");
        cities = JSON.parse(localStorage.getItem("cities"));
        console.log("cities[index] takes value " + cities[index]);
        // cityName = cities[index];
        console.log("adding in new city to array " + cityName);
        cities[index] = cityName;
        index++;
        localStorage.setItem("cities", JSON.stringify(cities));
        localStorage.setItem("index", JSON.stringify(index));
        console.log(cities);
    }

    // localStorage.getItem("cities");
  
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

        var lattitude = lattLong.lat;
        var longitude = lattLong.lon;
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

            todaysTempEl.text("Temperature: " + data.current.temp + " degrees Celcius");
            todaysWindEl.text("Wind speed: " + data.current.wind_speed + " km/h");
            todaysHumidEl.text("Humidity: " + data.current.humidity + "%");
            todaysUvEl.text("UV: " + data.current.uvi);

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

                    var weather7Day = data.daily;
                    
                    dateOneEl.text(moment().format('MMMM Do YYYY'));
                    cardOneTempEl.text("Temp: " +data.daily[0].temp.day + " C");
                    cardOneWindEl.text("Wind: " +data.daily[0].wind_speed + " kph");
                    cardOneHumidEl.text("Humidity: " +data.daily[0].humidity + "%");
                    cardOneUVEl.text("UV: " +data.daily[0].uvi);

                    dateTwoEl.text(moment("30/1/2022", "D/M/YYYY").format('MMMM Do YYYY'));
                    cardTwoTempEl.text("Temp: " +data.daily[1].temp.day + " C");
                    cardTwoWindEl.text("Wind: " +data.daily[1].wind_speed + " kph");
                    cardTwoHumidEl.text("Humidity: " +data.daily[1].humidity + "%");
                    cardTwoUVEl.text("UV: " +data.daily[1].uvi);

                    dateThreeEl.text(moment("31/1/2022", "D/M/YYYY").format('MMMM Do YYYY'));
                    cardThreeTempEl.text("Temp: " +data.daily[2].temp.day + " C");
                    cardThreeWindEl.text("Wind: " +data.daily[2].wind_speed + " kph");
                    cardThreeHumidEl.text("Humidity: " +data.daily[2].humidity + "%");
                    cardThreeUVEl.text("UV: " +data.daily[2].uvi);

                    dateFourEl.text(moment("1/2/2022", "D/M/YYYY").format('MMMM Do YYYY'));
                    cardFourTempEl.text("Temp: " +data.daily[3].temp.day + " C");
                    cardFourWindEl.text("Wind: " +data.daily[3].wind_speed + " kph");
                    cardFourHumidEl.text("Humidity: " +data.daily[3].humidity + "%");
                    cardFourUVEl.text("UV: " +data.daily[3].uvi);

                    dateFiveEl.text(moment("2/2/2022", "D/M/YYYY").format('MMMM Do YYYY'));
                    cardFiveTempEl.text("Temp: " +data.daily[4].temp.day + " C");
                    cardFiveWindEl.text("Wind: " +data.daily[4].wind_speed + " kph");
                    cardFiveHumidEl.text("Humidity: " +data.daily[4].humidity + "%");
                    cardFiveUVEl.text("UV: " +data.daily[4].uvi);



                    for (let i = 0; i < cities.length; i++) {
                        console.log(cities[i]);
                        cityButtons.append('<li>' +cities[i]+ '</li>')
                        
                    }
                })

        })
    })
}














// //fetch function with .then and response filtering
// var weatherRequestURL = 'http://api.openweathermap.org/data/2.5/onecall?lat=-34.92&lon=138.06&exclude=hourly,daily,alerts,minutely&units=metric&appid=93f009b07cdf38e8e5c9ff73cea6126b';
// // var timer = moment().format("H");

// fetch(weatherRequestURL)
//     .then (function(response){
//         return response.json();
//     })
//     .then(function(data){
//         console.log(data);
//         console.log("temp is " + data.current.temp + " C");
//         console.log("wind is " + data.current.wind_speed + " KM/H");
//         console.log("humidity is " + data.current.humidity +"%");
//         console.log("UV index is " + data.current.uvi);
//     })

//     var geolocatorRequestURL = 'http://api.openweathermap.org/geo/1.0/direct?q=Adelaide&appid=93f009b07cdf38e8e5c9ff73cea6126b'
    

// fetch(geolocatorRequestURL)
//     .then(function (response) {
//         return response.text();
//     })
//     .then(function (data) {

//         data = JSON.parse(data);
//         console.log("data is now ");
//         console.log(data);

//         var deeperData = data[0];
//         console.log("deeper data is ");
//         console.log(deeperData);
//         console.log(deeperData.name);
//         console.log("deeper data.lat is ");
//         console.log(deeperData.lat);
//         console.log("deeper data.lon is ");
//         console.log(deeperData.lon);

//         fiveDayFinder(deeperData.name);
//     })

//     function fiveDayFinder(deeperDn){
//         console.log("the name of the city is" + deeperDn);
//         var fivedayURL = "http://api.openweathermap.org/data/2.5/forecast?q="+ deeperDn +"&units=metric&appid=93f009b07cdf38e8e5c9ff73cea6126b";


//         fetch(fivedayURL)
//         .then(function (response) {
//             return response.text();
//         })
//         .then(function (data) {

//             data = JSON.parse(data);
//             console.log(data);
//             console.log("data.list[0] is" +data.list[0]);
//             var listofZero = data.list[0];
//             console.log("data.list[0] is" +JSON.parse(data.list[0]));

//         })
//     }
//     // https://api.openweathermap.org/data/2.5/onecall?lat=34.92&lon=138.60&appid=b631277a72ee76fd8b9c97d3a7b7f12e
//     // b631277a72ee76fd8b9c97d3a7b7f12e
//     // //lat and long 2 before decimal 2 after


// //returning data back to index through dynamic allocation 
// //(will need container in html)


