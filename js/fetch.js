const API_KEY = "7638a9c3978ee871c118ebe83f84495b";
const button = document.getElementById("buscar");
const h2 = document.getElementById("titulo");
const izq = document.getElementById("izq");
const ctr = document.getElementById("ctr");
const der = document.getElementById("der");
const ciudad = document.getElementById("ciudad");
const video = document.getElementById("video");

button.addEventListener("click", () => {
  buscarClima(ciudad.value);
});
//no sé si hay una forma más prolija de realizar la búsqueda con click y enter a la vez
//esto es lo único que me funcionó:
document.body.onkeydown = function (e) {
  if (e.key === 'Enter')
    buscarClima(ciudad.value);
};

if (localStorage.getItem('guardado') !== null) {
  var viendo = JSON.parse(localStorage.getItem('guardado'));

  h2.innerHTML = `${viendo.name}`
  izq.innerHTML = `<img src="http://openweathermap.org/img/wn/${viendo.weather[0].icon}@2x.png"/>
      <p class="casili">${viendo.weather[0].description}</p>`

  ctr.innerHTML = `
      <li class="h1 mb-2">${Math.round(viendo.main.temp)}°c</li>
      <li>Sensación térmica: ${Math.round(viendo.main.feels_like)}°C</li>
      <li>${Math.round(viendo.main.temp_max)}°c máx / ${Math.round(viendo.main.temp_min)}°c min</li>`

  der.innerHTML = `
      <li>Humedad: ${viendo.main.humidity}%</li>
      <li>Presión: ${viendo.main.pressure}hPa</li>
      <li>Viento: ${viendo.wind.speed}km/h</li>
      `
  video.innerHTML = `<iframe id="yutub" src="https://www.youtube.com/embed/0FXJUP6_O1w?enablejsapi=1"></iframe>`;
}

function buscarClima(inputCiudad) {
  fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputCiudad+'&appid='+API_KEY+'&units=metric&lang=es')
    .then(response => response.json())
    .then(data => {
      var nombreCiudad = data['name'];
      var temp = Math.round(data['main']['temp']);
      var tempMax = Math.round(data['main']['temp_max']);
      var tempMin = Math.round(data['main']['temp_min']);
      var humedad = data['main']['humidity'];
      var sensacionTermica = Math.round(data['main']['feels_like']);
      var presion = data['main']['pressure'];
      var viento = data['wind']['speed'];
      var iconito = data['weather'][0]['icon'];
      var desc = data['weather'][0]['description'];
      var descMain = data['weather'][0]['main'];

      if (descMain == "Rain") {
        var videito = "phdTCqFhS18";
      } else if (descMain == "Clouds") {
        var videito = "OKw-IkZE3_I";
      } else if (descMain == "Thunderstorm") {
        var videito = "uupSgrlr_4Y";
      } else if (descMain == "Snow") {
        var videito = "MYnElTvpMPY";
      } else if (descMain == "Clear") {
        var videito = "1Dl3Wid1CpQ";
      } else {
        var videito = "HGQ9-uvlXyc";
      };

      localStorage.setItem('guardado', JSON.stringify(data));

      h2.innerHTML = `${nombreCiudad}`
      izq.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconito}@2x.png"/>
      <p class="casili">${desc}</p>`

      ctr.innerHTML = `
      <li class="h1 mb-2">${temp}°c</li>
      <li>Sensación térmica: ${sensacionTermica}°C</li>
      <li>${tempMax}°c máx / ${tempMin}°c min</li>`

      der.innerHTML = `
      <li>Humedad: ${humedad}%</li>
      <li>Presión: ${presion}hPa</li>
      <li>Viento: ${viento}km/h</li>
      `;

      video.innerHTML = `<iframe id="yutub" src="https://www.youtube.com/embed/${videito}?enablejsapi=1"></iframe>`
    })
};

//YT API
var tag = document.createElement('script');
tag.id = 'prueba';
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('yutub', {
    playerVars: { 'autoplay': 1, 'controls': 0 },
    events: {
      'onReady': onPlayerReady,
    }
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
  document.getElementById('yutub').style.borderColor = 'white';
}
