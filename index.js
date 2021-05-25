
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



function getHikeData(lat, lng){
	$('.hike-button').click(event =>{
    $.getJSON('https://www.hikingproject.com/data/get-trails?',{
      lat: `${lat}`,
      lon: `${lng}`,
      maxDistance: 50,
      maxResults: 12,
      key: '200228708-342833161758642e366f0f5189964977'
      }, 
      function(hikeResponse){
  	    let trails = hikeResponse.trails.map((item, index) => renderTrailData(item));
  	    $('.activity_results').html(trails);
    });
  });
}

function getClimbData(lat, lng){
	$('.climb-button').click(event =>{
    $.getJSON('https://www.mountainproject.com/data/get-routes-for-lat-lon?',{
      lat: `${lat}`,
      lon: `${lng}`,
      maxDistance: 50,
      minDiff: 5.6,
      maxDiff: 5.11,
      maxResults: 12,
      key: '200228708-038c5314f084927567e4ee92d566df92'
      }, 
      function(climbResponse){
        console.log(climbResponse);

  	    let routes = climbResponse.routes.map((item, index) => renderClimbData(item));
  	    $('.activity_results').html(routes);
    });
  });
}

function renderClimbData(data){
	console.log(data)
	let imgSmall = data.imgSmall ? data.imgSmall : './images/no_image.png';
	return `
	  <div class="result_col_4">
	    <a href="${data.url}" target="_blank">
	    <img src="${imgSmall}" alt="rockface picture"></a>
	    <p>${data.name}</p>
	    <p>${data.location[1]}</p>
	    <p>${data.type}</p>
	    <p>${data.rating}</p>
	  </div>
	  ` 
	}

function renderTrailData(data){
  console.log(data);
  let imgSmall = data.imgSmall ? data.imgSmall : './images/no_image.png';
  return`   
    <div class="result_col_4">
     <a href="${data.url}" target="_blank">
     <img src = "${data.imgSmall}" alt="trail photo"></a>
     <p>${data.name}</p>
     <p>${data.location}</p>
     <p>${data.length} Miles</p>
     <p>${data.conditionStatus}</p>
    </div>
  `
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

