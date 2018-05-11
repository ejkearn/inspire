function WeatherController(){
	var wc = this;
	var weatherService = new WeatherService();
	
function getWeather(){

weatherService.getWeather(drawWeather)
}

function drawWeather(kTemp){

	document.getElementById('weather').innerText = `The tempurature today is ${Math.floor(kTemp*(9/5)-459.67)} °F`
}


getWeather()
}
