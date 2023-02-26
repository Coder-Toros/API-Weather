// Password: p#xXG8-mZ?.8ZDx

const param = {
  url: "https://api.openweathermap.org/data/2.5/",
  appid: "e30c91865d4caa669ef85f79fbf60409",
};

const cities = {
  2643743: "london",
  3099434: "gdansk",
  705812: "kropyvnytskyi",
  698740: "odesa",
  707308: "izmail",
  703448: "kyiv",
};

let newSelect = document.createElement("select");
newSelect.classList.add("city");
for (let key in cities) {
  let option = document.createElement("option");
  option.value = key;
  option.innerHTML = cities[key];
  newSelect.add(option);
}
document.querySelector("#city").replaceWith(newSelect);

function getWether() {
  const cityId = document.querySelector(".city").value;
  fetch(`${param.url}weather?id=${cityId}&units=metric&appid=${param.appid}`)
    .then((weather) => {
      return weather.json();
    })
    .then(showWeather);
}

function showWeather(data) {
  let nameCity = document.querySelector(".package-name");
  nameCity.textContent = data.name;

  let degree = document.querySelector(".price");
  degree.innerHTML = Math.round(data.main.temp) + "&degC";

  let mainDescription = document.querySelector(".description");
  mainDescription.textContent = data.weather[0]["description"];

  let icon = document.querySelector(".features li");
  icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png">`;

  let windSpeed = document.querySelector(".features2");
  windSpeed.innerHTML = `Wind speed:${Math.round(data.wind.speed)}m/s`;

  let pressure = document.querySelector(".features3");
  pressure.innerHTML = `Pressure:${data.main.pressure}hPa`;

  let windDerection = data.wind.deg;

  if (data.wind.deg > 337 || data.wind.deg < 22) {
    windDerection = "N";
  }

  if (data.wind.deg > 22 && data.wind.deg < 67) {
    windDerection = "NE";
  }

  if (data.wind.deg > 67 && data.wind.deg < 122) {
    windDerection = "E";
  }

  if (data.wind.deg > 122 && data.wind.deg < 157) {
    windDerection = "SE";
  }

  if (windDerection > 157 && windDerection < 202) {
    windDerection = "S";
  }

  if (data.wind.deg > 202 && data.wind.deg < 247) {
    windDerection = "SW";
  }

  if (data.wind.deg > 292 && data.wind.deg < 337) {
    windDerection = "NW";
  }

  if (data.wind.deg > 247 && data.wind.deg < 292) {
    windDerection = "W";
  }

  let getWindDerection = document.querySelector(".features4");
  getWindDerection.innerHTML = `Wind derection:${windDerection}`;

  console.log(data);
}

getWether();
document.querySelector(".city").onchange = getWether;
