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
    alert("Unable to fetch location. Please enable location access.");
  }

  function getCityName(location) {
    const apiKey = "58f9100d4178179df67ffaa88471a425"; // Replace with your OpenWeather API key
    const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${location.lat}&lon=${location.lon}&limit=1&appid=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const city = data[0]?.name;
        console.log("City Name:", city);
        document.querySelector(".weather").style.display = "block";
        // You can now call your weather API using this city name
        checkWeather(city);
      })
      .catch((error) => console.error("Error fetching city name:", error));
  }
};
const apiKey = "58f9100d4178179df67ffaa88471a425";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  var data = await response.json();
  console.log(data);
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
  if (data.weather[0].main == "Clouds") {
    weatherIcon.src = "images/clouds.png";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.src = "images/clear.png";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.src = "images/rain.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.src = "images/drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.src = "images/Mist.png";
  } else if (data.weather[0].main == "Snow") {
    weatherIcon.src = "images/snow.png";
  }
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
