const weatherAPIKey = 'b76275c8ff59201b6347f23d590929f1';

document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const city1 = document.getElementById('city1').value;
    const city2 = document.getElementById('city2').value;
    getWeatherData(city1, city2);
});

function getWeatherData(city1, city2) {
    axios.all([
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city1}&appid=${weatherAPIKey}`),
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city2}&appid=${weatherAPIKey}`)
    ])
    .then(axios.spread((result1, result2) => {
        displayWeatherData(result1.data, result2.data);
    }))
    .catch(error => {
        console.error(error);
    });
}

function displayWeatherData(data1, data2) {
    const weatherResults = document.getElementById('weatherResults');
    weatherResults.innerHTML = `
        <h2>${data1.name}</h2>
        <p>Temperature: ${data1.main.temp} K</p>
        <p>Description: ${data1.weather[0].description}</p>
        <hr>
        <h2>${data2.name}</h2>
        <p>Temperature: ${data2.main.temp} K</p>
        <p>Description: ${data2.weather[0].description}</p>
    `;
}
