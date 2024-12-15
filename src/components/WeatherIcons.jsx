const weatherData = {
    weather: [
        {
            icon: "01d"
        }
    ]
};

// URL do ikony
const iconCode = weatherData.weather[0].icon;
const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

// Wyświetlanie ikony w HTML
document.getElementById("weather-icon").src = iconUrl;
