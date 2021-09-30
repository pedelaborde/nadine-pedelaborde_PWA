const API_KEY = "7638a9c3978ee871c118ebe83f84495b";
const button = document.getElementById("sendButton");
const h2 = document.getElementById("titulo");
const izq = document.getElementById("izq");
const ctr = document.getElementById("ctr");
const der = document.getElementById("der");
const ciudad = document.getElementById("ciudad");
const main = document.getElementById("main");

button.addEventListener("click", () => {
  buscarEnAPI(ciudad.value);
});
//no sé si hay una forma más prolija de realizar la búsqueda con click y enter a la vez
//esto es lo único que me funcionó:
document.body.onkeydown = function(e) {
  if (e.key === 'Enter')
  buscarEnAPI(ciudad.value);
};

function buscarEnAPI(inputCiudad) {
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
      var velocidadViento = data['wind']['speed'];
      var iconito = data['weather'][0]['icon'];
      var desc = data['weather'][0]['description'];
      
      var descMain = data['weather'][0]['main'];

      if (descMain == "Rain"){
        var videito = "phdTCqFhS18";
      } else if (descMain == "Clouds"){
        var videito = "OKw-IkZE3_I";
      } else if (descMain == "Thunderstorm"){
        var videito = "uupSgrlr_4Y";
      } else if (descMain == "Snow"){
        var videito = "MYnElTvpMPY";
      } else if (descMain == "Clear"){
        var videito = "1Dl3Wid1CpQ";
      } else {
        var videito = "HGQ9-uvlXyc";
      };

      console.log(descMain);

      h2.innerHTML = `<h2 class="display-4 mb-0">${nombreCiudad}</h2>`
      izq.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconito}@2x.png"/>
      <p class="casili">${desc}</p>`
      
      ctr.innerHTML = `
      <li class="h1 mb-2">${temp}°c</li>
      <li>Sensación térmica: ${sensacionTermica}°C</li>
      <li>${tempMax}°c máx / ${tempMin}°c min</li>`

      der.innerHTML = `
      <li>Humedad: ${humedad}%</li>
      <li>Presión: ${presion}hPa</li>
      <li>Viento: ${velocidadViento}km/h</li>
      `;

      main.innerHTML=`<iframe id="yutub"
      src="https://www.youtube.com/embed/${videito}?enablejsapi=1"></iframe>`
    })
};
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