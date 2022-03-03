document.addEventListener('DOMContentLoaded', printWeather);
document.addEventListener('DOMContentLoaded', printCurrency);
var weathInfo = document.querySelector(".weathField");
var currInfo = document.querySelector(".currField");
document.getElementById("upd").addEventListener('click', printWeather);
document.getElementById("upd2").addEventListener('click', printCurrency);

//для поддержки IE
var request;
var request2;
if (window.XMLHttpRequest) { 
    request = new XMLHttpRequest();
    request2 = new XMLHttpRequest();
} else if (window.ActiveXObject) { // IE
    request = new ActiveXObject("Microsoft.XMLHTTP");
    request2 = new ActiveXObject("Microsoft.XMLHTTP");
}



function handlerWheatherChange() {
	if (request.status == 200) {
		var weath = JSON.parse(request.responseText);
		weathInfo.innerHTML += '<p>В Санкт-Петербурге: </p>';

		weathInfo.innerHTML += '<div class="weathPos"><i>Температура: ' + Math.round(weath.main.temp - 272,1) + ' <sup>o</sup>С</i></div>';
		weathInfo.innerHTML += '<div class="weathPos"><i>Ощущается как: ' + Math.round(weath.main.feels_like - 272,1) + ' <sup>o</sup>С</i></div>';
		weathInfo.innerHTML += '<div class="weathPos"><i>Облачность: ' + weath.clouds.all + '%</i></div>';
		weathInfo.innerHTML += '<div class="weathPos"><i>Атмосферное давление: ' + weath.main.pressure + 'мм</i></div>';
		weathInfo.innerHTML += '<div class="weathPos"><i>Влажность: ' + weath.main.humidity + '%</i></div>';
		weathInfo.innerHTML += '<div class="weathPos"><i>Осадки: ' + weath.weather[0].description + '</i></div>';
	}
}

function handlerCurrencyChange() {
	if (request2.status == 200) {
		var curr = JSON.parse(request2.responseText);

		currInfo.innerHTML += '<div class="currPos"><b>' + curr.Valute.USD.Nominal + ' ' + curr.Valute.USD.Name + '</b> - ' + curr.Valute.USD.Value + ' ₽</div>';
		currInfo.innerHTML += '<div class="currPos"><b>' + curr.Valute.EUR.Nominal + ' ' + curr.Valute.EUR.Name + '</b> - ' + curr.Valute.EUR.Value + ' ₽</div>';
		currInfo.innerHTML += '<div class="currPos"><b>' + curr.Valute.CZK.Nominal + ' ' + curr.Valute.CZK.Name + '</b> - ' + curr.Valute.CZK.Value + ' ₽</div>';
		currInfo.innerHTML += '<div class="currPos"><b>' + curr.Valute.JPY.Nominal + ' ' + curr.Valute.JPY.Name + '</b> - ' + curr.Valute.JPY.Value + ' ₽</div>';
	}
}

function printWeather(){
	weathInfo.innerHTML = " ";
	request.onload = handlerWheatherChange;
	request.open("GET", "http://api.openweathermap.org/data/2.5/weather?id=498817&appid=7af6352588799beb0c7f76a8bac989cd", true);
	request.send();
}

function printCurrency(){
	currInfo.innerHTML = " ";
	request2.onload = handlerCurrencyChange;
	request2.open("GET", "https://www.cbr-xml-daily.ru/daily_json.js", true);
	request2.send();
}
