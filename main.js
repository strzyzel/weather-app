var icons = new Skycons({"color": "white"});
var apiurl = "http://api.openweathermap.org/data/2.5/weather?";
var apikey = "240d0c7d3ccce7055acbfe4485932fed";
var lat, lon;
document.addEventListener('DOMContentLoaded', function getLocation() {
	
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
        	var lat = "lat=" + position.coords.latitude;
        	var lon = "lon=" + position.coords.longitude;
        	getWeather(lat, lon);
       	 });
     } else {
    console.log("Geolocation is not supported by this browser.");
  	}
});


function getWeather(lat, lon) {
	var urlString = apiurl + lat + "&" + lon + "&appid=" + apikey;
	console.log(urlString);
	$.ajax({
		url: urlString, success: function(result) {
			$("#city").text(result.name + ", ");
			$("#country").text(result.sys.country);
			currentTempInCelsius = Math.round(result.main.temp - 273.15);
			$("#temp").text(currentTempInCelsius + String.fromCharCode(176) + "C");
			currentTempInFahrenheit = Math.round(result.main.temp * 1.8 - 459.67);
			$("#temp-f").text(currentTempInFahrenheit + String.fromCharCode(176) + "F");
			$("#desc").text(result.weather[0].main);
			BgGen(result.weather[0].main, result.dt, result.sys.sunrise, result.sys.sunset);
			IconGen(result.weather[0].main, result.dt, result.sys.sunrise, result.sys.sunset, result.weather[0].id);

		}
	})
}

function BgGen(desc, dt, sunrise, sunset) {
	var desc = desc.toLowerCase();
	if (dt > sunset || dt < sunrise) {
	$("body").addClass(desc).addClass("night");
	}
	$("body").addClass(desc);
}

function IconGen(desc, dt, sunrise, sunset, id) {
	var desc = desc.toLowerCase();
	if (dt > sunset || dt < sunrise) {
		if (desc = 'clear') {
			$("#clear-night").removeClass('hide');
		}
	} else if (desc = 'clear') {
		$("#clear").removeClass('hide');
	}
	switch (desc) {
		case 'cloudy':
		$("#cloudy").removeClass('hide')
		break;
		case 'rain':
		$("#rain").removeClass('hide')
		break;
		case 'snow':
		$("#snow").removeClass('hide')
		break;
	}
}

$("#temp").click(function(){
	$("#temp-f").removeClass('hide');
	$("#temp").addClass('hide');
});
$("#temp-f").click(function(){
	$("#temp").removeClass('hide');
	$("#temp-f").addClass('hide');
});

icons.set("clear", Skycons.CLEAR_DAY);
icons.set("clear-night", Skycons.CLEAR_NIGHT);
icons.set("cloudy", Skycons.CLOUDY);
icons.set("rain", Skycons.RAIN);
icons.set("snow", Skycons.SNOW);

icons.play();