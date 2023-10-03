const api_key = '1b4fb05b451213b6aaad08b25d3f3f92';

		const weatherData = async (city) => {
			const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`);
			const data = await response.json();
			return data;
		};

		const updateWeather = (data) => {
			const location = document.querySelector('.location');
			const temperature = document.querySelector('.temperature');
			const description = document.querySelector('.description');
			const humidity = document.querySelector('#humidity');
			const windSpeed = document.querySelector('#wind-speed');
			const pressure = document.querySelector('#pressure');
			const icon = document.querySelector('img');

			location.innerHTML = `<h1> City, Country: ${data.name}, ${data.sys.country}</h1><p>Date and Time: ${new Date().toLocaleString()}</p>`;
			temperature.innerHTML = `<h2>Temperature: ${data.main.temp}&deg;C</h2>`;
			description.innerHTML = `<h3>Description: ${data.weather[0].main}</h3><p>${data.weather[0].description}</p>`;
			humidity.innerHTML = `${data.main.humidity}%`;
			windSpeed.innerHTML = `${data.wind.speed} m/s`;
			pressure.innerHTML = `${data.main.pressure} hPa`;
			icon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
			icon.alt = data.weather[0].main;
		};

		const weatherForm = document.querySelector('#weather-form');
		const cityInput = document.querySelector('#city-input');

		weatherForm.addEventListener('submit', (event) => {
			event.preventDefault();
			const city = cityInput.value;
			weatherData(city)
				.then(data => {
					updateWeather(data);
				})
				.catch(error => {
					console.log(error);
				});
			});