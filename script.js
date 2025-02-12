const apiKey = '16c0628b2501481566844895b9db5205';  
const searchButton = document.getElementById('search-btn');
const cityInput = document.getElementById('city');
const errorMessage = document.getElementById('error-message');
const weatherInfo = document.getElementById('weather-info');
const cityName = document.getElementById('city-name');
const temperatureElement = document.getElementById('temperature');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('wind-speed');
const descriptionElement = document.getElementById('description');
const weatherIcon = document.getElementById('weather-icon');

let temperatureInCelsius;

function displayWeather(data, unit = 'metric') {
    errorMessage.innerText = '';
    const { name, main, wind, weather } = data;
    cityName.innerText = name;
    temperatureInCelsius = main.temp;
    const temperature = unit === 'metric' ? temperatureInCelsius : (temperatureInCelsius * 9/5) + 32;

    temperatureElement.innerHTML = `Temperature: ${temperature.toFixed(1)}° ${unit === 'metric' ? 'C' : 'F'}`;
    humidityElement.innerHTML = `Humidity: ${main.humidity}%`;
    windSpeedElement.innerHTML = `Wind Speed: ${wind.speed} m/s`;
    descriptionElement.innerHTML = `Description: ${weather[0].description}`;
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}.png" alt="${weather[0].description}">`;
}

function fetchWeather(city, unit = 'metric') {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data, unit);
        })
        .catch(error => {
            errorMessage.innerText = error.message;
            weatherInfo.innerHTML = '';
        });
}

searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        errorMessage.innerText = 'Please enter a city name.';
    }
});

document.getElementById('celsius-btn').addEventListener('click', () => {
    if (temperatureInCelsius !== undefined) {
        displayWeather({ main: { temp: temperatureInCelsius } }, 'metric');
    }
});

document.getElementById('fahrenheit-btn').addEventListener('click', () => {
    if (temperatureInCelsius !== undefined) {
        displayWeather({ main: { temp: temperatureInCelsius } }, 'imperial');
    }
});
