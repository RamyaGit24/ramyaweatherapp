const apiKey = 'c425078799f15c3a75f8e01d8eef148e';  

const cityInput = document.getElementById('city-input');
const getWeatherButton = document.getElementById('get-weather');
const cityNameElement = document.getElementById('city-name');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const windElement = document.getElementById('wind');
const weatherIconElement = document.getElementById('weather-icon');

const fetchWeather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === '404') {
            alert("City not found. Please enter a valid city name.");
        } else {
            cityNameElement.innerText = data.name;
            temperatureElement.innerText = `${Math.round(data.main.temp)}°C`;
            descriptionElement.innerText = data.weather[0].description;
            humidityElement.innerText = `Humidity: ${data.main.humidity}%`;
            windElement.innerText = `Wind: ${data.wind.speed} km/h`;

            const iconCode = data.weather[0].icon;
            weatherIconElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather icon">`;
        }
    } catch (error) {
        console.error(error);
        alert('Error fetching weather data.');
    }
};

getWeatherButton.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        fetchWeather(city);
    } else {
        alert('Please enter a city name');
    }
});
