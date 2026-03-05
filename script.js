const apiKey = "YOUR_API_KEY";

const button = document.getElementById("getWeatherBtn");
const result = document.getElementById("WeatherResult");
const cityInput = document.getElementById("cityInput");

button.addEventListener("click", async () => {

    let city = cityInput.value.trim();

    if(city === ""){
        result.innerHTML = "Please enter a city name.";
        return;
    }

    result.innerHTML = "Loading...";

    try{

        const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        const data = await response.json();

        if(data.cod !== 200){
            result.innerHTML = data.message;
            return;
        }

        const { name, main, weather, sys, rain } = data;

        const sunrise =
        new Date(sys.sunrise * 1000).toLocaleTimeString();

        const sunset =
        new Date(sys.sunset * 1000).toLocaleTimeString();

        const rainChance =
        rain ? (rain["1h"] || 0) + " mm" : "No rain";

        result.innerHTML = `
            <h3>${name}</h3>
            <p>Temperature: ${main.temp}°C</p>
            <p>Condition: ${weather[0].description}</p>
            <p>Humidity: ${main.humidity}%</p>
            <p>Rain: ${rainChance}</p>
            <p>Sunrise: ${sunrise}</p>
            <p>Sunset: ${sunset}</p>
        `;

    }

    catch(error){
        result.innerHTML = "Error: " + error.message;
    }

});