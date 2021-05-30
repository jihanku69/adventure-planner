
function getLongLat(location){
	console.log($('.js-query').val());
  $.getJSON('https://maps.googleapis.com/maps/api/geocode/json',{
    address:`${location}`,
    key:'AIzaSyB4Xc0nTrdkoE2k7F0vnJ-mLfKyTF5wqSE'
		}, 
		function(response){
			console.log(response);
			let lat = response.results[0].geometry.location.lat;
			let lng = response.results[0].geometry.location.lng;
			getWeatherData(lat, lng);
			getHikeData(lat, lng);
			getClimbData(lat, lng);
			weatherHeader(response);

	});
}

function getWeatherData() {
    let city = $('.search-query').val();
    $.ajax(WEATHER_SEARCH_URL, {
        data: {
            units: 'imperial',
            q: city
        },
        dataType: 'jsonp',
        type: 'GET',
        success: function (data) {
            let widget = displayWeather(data);
            $('#weather-display').html(widget);
            scrollPageTo('#weather-display', 15);
        }
    });
}

function displayWeather(data) {
    return `
    <div class="weather-results">
        <h1><strong>Current Weather for ${data.name}</strong></h1>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
        <p style="font-size:30px; margin-top:10px;">${data.weather[0].main}</p>
        <p style="color:steelblue;" ">Description:</p><p"> ${data.weather[0].description}</p>
        <p style="color:steelblue;">Temperature:</p><p> ${data.main.temp} &#8457; / ${(((data.main.temp)-32)*(5/9)).toFixed(2)} &#8451;</p>
        <p style="color:steelblue;">Min. Temperature:</p><p> ${data.main.temp_min} &#8457; / ${(((data.main.temp_min)-32)*(5/9)).toFixed(2)} &#8451</p>
        <p style="color:steelblue;">Max. Temperature:</p><p> ${data.main.temp_max} &#8457; / ${(((data.main.temp_max)-32)*(5/9)).toFixed(2)} &#8451</p>
        <p style="color:steelblue;">Humidity:</p><p> ${data.main.humidity} &#37;</p>
    </div>
`;
}

function enterLocation(){
  $('.location-form').submit(event => {
  event.preventDefault();
  let query = $('.js-query').val();
  $('.js-query').val("");
  getLongLat(query);
  $('.navigation').removeClass('hide');
  })
}

function activatePlacesSearch(){
  let input = document.getElementById('autocomplete')
  let autocomplete = new google.maps.places.Autocomplete(input);
}

$(enterLocation);

