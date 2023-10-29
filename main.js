document.addEventListener("DOMContentLoaded", function() {
    const queryInput = document.getElementById("queryInput");
    const searchButton = document.getElementById("searchButton");
    const weatherInfo = document.getElementById("weatherInfo");

    searchButton.addEventListener("click", function() {
        const query = queryInput.value.toLowerCase();
        if (query.includes("погода")) {
            const city = query.replace("погода", "").trim();
            if (city) {
                getWeather(city);
            } else {
                weatherInfo.innerHTML = "Введите название города после слова 'погода'.";
            }
        } else {
            weatherInfo.innerHTML = "Введите 'погода' и название города для поиска погоды.";
        }
    });

    function getWeather(city) {
        const apiKey = "19491e261987d8a9ddfb46303bad88cc"; // Замените на свой API-ключ OpenWeatherMap
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    const mainInfo = data.weather[0].main;
                    const description = data.weather[0].description;
                    const temperature = data.main.temp;
                    weatherInfo.innerHTML = `Погода в ${city}: ${mainInfo} (${description}), Температура: ${temperature}°C`;
                } else {
                    weatherInfo.innerHTML = "Не удалось получить данные о погоде.";
                }
            })
            .catch(error => {
                console.error(error);
                weatherInfo.innerHTML = "Произошла ошибка при запросе данных.";
            });
    }
});
