window.onload = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    alert("Geolocation is not supported by this browser.");
  }

  function successCallback(position) {
    const location = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    };

    getCityName(location);
  }

  function errorCallback(error) {
    console.error("Error getting location:", error);
    // alert("Unable to fetch location. Please enable location access.");
  }

  function getCityName(location) {
    const apiKey = "58f9100d4178179df67ffaa88471a425";
    const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${location.lat}&lon=${location.lon}&limit=1&appid=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const city = data[0]?.name;
        console.log("City Name:", city);
        document.querySelector(".error").style.display = "none";
        document.querySelector(".location").style.display = "none";
        document.querySelector(".weather").style.display = "block";
        checkWeather(city);
      })
      .catch((error) => console.error("Error fetching city name:", error));
  }
};
const apiKey = "cdcb77cef8954e15ab0193322252506";
const apiUrl = "http://api.weatherapi.com/v1/current.json?&aqi=no&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&key=${apiKey}`);
  if (response.status == 400) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".location").style.display = "none";
    document.querySelector(".weather").style.display = "none";
  }
  var data = await response.json();
  console.log(data);
  const weatherCondition = data.current.condition.code;
  console.log(data.current.condition.code);
  document.querySelector(".city").innerHTML = data.location.name;
  document.querySelector(".temp").innerHTML =
    Math.round(data.current.temp_c) + "°C";
  document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
  document.querySelector(".wind").innerHTML = data.current.wind_kph + "km/h";
  if (
    weatherCondition == 1003 ||
    weatherCondition == 1006 ||
    weatherCondition == 1009 ||
    weatherCondition == 1063 ||
    weatherCondition == 1087
  ) {
    weatherIcon.src = "images/clouds.png";
  } else if (weatherCondition == 1000) {
    weatherIcon.src = "images/clear.png";
  } else if (
    weatherCondition == 1240 ||
    weatherCondition == 1243 ||
    weatherCondition == 1246 ||
    weatherCondition == 1273 ||
    weatherCondition == 1276 ||
    weatherCondition == 1180 ||
    weatherCondition == 1183 ||
    weatherCondition == 1186 ||
    weatherCondition == 1189 ||
    weatherCondition == 1192 ||
    weatherCondition == 1195 ||
    weatherCondition == 1198 ||
    weatherCondition == 1201
  ) {
    weatherIcon.src = "images/rain.png";
  } else if (
    weatherCondition == 1072 ||
    weatherCondition == 1150 ||
    weatherCondition == 1153 ||
    weatherCondition == 1168 ||
    weatherCondition == 1171
  ) {
    weatherIcon.src = "images/drizzle.png";
  } else if (
    weatherCondition == 1030 ||
    weatherCondition == 1135 ||
    weatherCondition == 1147
  ) {
    weatherIcon.src = "images/Mist.png";
  } else if (
    weatherCondition == 1066 ||
    weatherCondition == 1069 ||
    weatherCondition == 1114 ||
    weatherCondition == 1117 ||
    weatherCondition == 1204 ||
    weatherCondition == 1207 ||
    weatherCondition == 1210 ||
    weatherCondition == 1213 ||
    weatherCondition == 1219 ||
    weatherCondition == 1222 ||
    weatherCondition == 1225 ||
    weatherCondition == 1237 ||
    weatherCondition == 1249 ||
    weatherCondition == 1252 ||
    weatherCondition == 1255 ||
    weatherCondition == 1258 ||
    weatherCondition == 1261 ||
    weatherCondition == 1264 ||
    weatherCondition == 1279 ||
    weatherCondition == 1282
  ) {
    weatherIcon.src = "images/snow.png";
  }
  document.querySelector(".location").style.display = "none";
  document.querySelector(".error").style.display = "none";
  document.querySelector(".weather").style.display = "block";
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
document
  .getElementById("searchBox")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      checkWeather(searchBox.value);
    }
  });
