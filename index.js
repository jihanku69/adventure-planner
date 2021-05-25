
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

function getWeatherData(lat, lng){
  console.log(lat);
  console.log(lng);
  $.getJSON(`pro.openweathermap.org/data/2.5/forecast/hourly?q={city name}&appid={API key}`,{
    }, 
    function(weatherResponse){
  	  let widget = renderWeatherData(weatherResponse);
  	  $('.weather_results').html(widget);
  });
}

function renderWeatherLocation(data){
	console.log(data);
	return `
	<div class="city_state">
	  <h2>5 Day Forecast: ${data.results[0].address_components[0].long_name}, ${data.results[0].address_components[2].long_name}</h2>
	</div>  `
}

function weatherHeader(data){
  let widget = renderWeatherLocation(data)
  $('.city_state').html(widget);
}


function renderWeatherData(data){
	console.log(data);
	return `
  <div class="weather_results">
    <ul>
      <li>${data.forecast.simpleforecast.forecastday[0].date.weekday}</li>
      <li>${data.forecast.simpleforecast.forecastday[0].date.day} ${data.forecast.simpleforecast.forecastday[0].date.monthname} ${data.forecast.simpleforecast.forecastday[0].date.year}</li>	
      <li><img src="${data.forecast.simpleforecast.forecastday[0].icon_url}"></li>
      <li>${data.forecast.simpleforecast.forecastday[0].conditions}</li>
      <li>High Temp: ${data.forecast.simpleforecast.forecastday[0].high.fahrenheit} &#8457 </li>
      <li>Low Temp: ${data.forecast.simpleforecast.forecastday[0].low.fahrenheit} &#8457 </li>
    </ul>		
    <ul>
      <li>${data.forecast.simpleforecast.forecastday[1].date.weekday}</li>
      <li>${data.forecast.simpleforecast.forecastday[1].date.day} ${data.forecast.simpleforecast.forecastday[1].date.monthname} ${data.forecast.simpleforecast.forecastday[1].date.year}</li>	
      <li><img src="${data.forecast.simpleforecast.forecastday[1].icon_url}"></li>
      <li>${data.forecast.simpleforecast.forecastday[1].conditions}</li>
      <li>High Temp: ${data.forecast.simpleforecast.forecastday[1].high.fahrenheit} &#8457 </li>
      <li>Low Temp: ${data.forecast.simpleforecast.forecastday[1].low.fahrenheit} &#8457 </li>
    </ul>	
    <ul>
      <li>${data.forecast.simpleforecast.forecastday[2].date.weekday}</li>
      <li>${data.forecast.simpleforecast.forecastday[2].date.day} ${data.forecast.simpleforecast.forecastday[2].date.monthname} ${data.forecast.simpleforecast.forecastday[2].date.year}</li>	
      <li><img src="${data.forecast.simpleforecast.forecastday[2].icon_url}"></li>
      <li>${data.forecast.simpleforecast.forecastday[2].conditions}</li>
      <li>High Temp: ${data.forecast.simpleforecast.forecastday[2].high.fahrenheit} &#8457 </li>
      <li>Low Temp: ${data.forecast.simpleforecast.forecastday[2].low.fahrenheit} &#8457 </li>
    </ul>	
    <ul>
      <li>${data.forecast.simpleforecast.forecastday[3].date.weekday}</li>
      <li>${data.forecast.simpleforecast.forecastday[3].date.day} ${data.forecast.simpleforecast.forecastday[3].date.monthname} ${data.forecast.simpleforecast.forecastday[3].date.year}</li>	
      <li><img src="${data.forecast.simpleforecast.forecastday[3].icon_url}"></li>
      <li>${data.forecast.simpleforecast.forecastday[3].conditions}</li>
      <li>High Temp: ${data.forecast.simpleforecast.forecastday[3].high.fahrenheit} &#8457 </li>
      <li>Low Temp: ${data.forecast.simpleforecast.forecastday[3].low.fahrenheit} &#8457 </li>
    </ul>	
    <ul>
      <li>${data.forecast.simpleforecast.forecastday[4].date.weekday}</li>
      <li>${data.forecast.simpleforecast.forecastday[4].date.day} ${data.forecast.simpleforecast.forecastday[4].date.monthname} ${data.forecast.simpleforecast.forecastday[4].date.year}</li>	
      <li><img src="${data.forecast.simpleforecast.forecastday[4].icon_url}"></li>
      <li>${data.forecast.simpleforecast.forecastday[4].conditions}</li>
      <li>High Temp: ${data.forecast.simpleforecast.forecastday[4].high.fahrenheit} &#8457 </li>
      <li>Low Temp: ${data.forecast.simpleforecast.forecastday[4].low.fahrenheit} &#8457 </li>
    </ul>	
  </div>`;
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

