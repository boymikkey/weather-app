document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'af4a0c1c2f58ec21975890571c397c3b'; // Replace with your OpenWeatherMap API key
    const getWeatherBtn = document.getElementById('getWeatherBtn');
    const weatherResult = document.getElementById('weatherResult');
    const cityInput = document.getElementById('cityInput');
  
    getWeatherBtn.addEventListener('click', function() {
      const city = cityInput.value;
      if (city) {
        fetchWeather(city);
      } else {
        alert('Please Enter a valid city name');
      }
    });
  
    function fetchWeather(city) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.cod === 200) {
            displayWeather(data);
          } else {
            weatherResult.textContent = 'City not found.';
          }
        })
        .catch(error => {
          weatherResult.textContent = 'An error occurred. Please try again.';
          console.error('Error:', error);
        });
    }
  
    function displayWeather(data) {
      const { main, weather, name } = data;
      weatherResult.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p>Temperature: ${main.temp} °C</p>
        <p>Weather: ${weather[0].description}</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Pressure: ${main.pressure} hPa</p>
      `;
    }
  });
  