const key = 'c84f8989c8b18f8e7a0c2b99cec1b179';

async function search() {
    // console.log('Search function called'); // Add this line
    const phrase = document.querySelector('input[type="text"]').value;
    // console.log('Search phrase:', phrase); // Add this line

    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${phrase}&limit=5&appid=${key}`);
    // console.log('API response:', response); // Add this line

    const data = await response.json();
    // console.log('API data:', data); // Add this line

    const ul = document.querySelector('form ul');
    // console.log('UL element:', ul); // Add this line
    ul.innerHTML = '';

    for (let i = 0; i < data.length; i++) {
        const {name, lat, lon, country} = data[i];
        ul.innerHTML += `<li 
        data-lat="${lat}" 
        data-lon="${lon}">
        ${name}, ${country}</li>`;
    }
}

const debouncedSearch = _.debounce(() => {
    search();
}, 600);

async function showWeather(lat, lon, name) {
    const response = await fetch(input: `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${key}&units=metric`);
    const data = await response.json();
    const temp = Math.round(data.main.temp);
    const feels_like = Math.round(data.main.feels_like);
    const humidity = Math.round(data.main.humidity);
    const wind_speed = Math.round(data.wind.speed);
    const icon =data.weather[0].icon;
    // console.log(temp, feels_like, humidity, wind_speed, icon,data);
    // console.log(data);
    document.getElementById(elementId: 'city').innerText = name;
    document.getElementById(elementId: 'degrees').innerText = temp + '&#8451;';
    document.getElementById(elementId: 'feels_like').innerText = feels_like + '&#8451;';
    document.getElementById(elementId: 'windValue').innerText = wind_speed + '<span>km/h</span>';
    document.getElementById(elementId: 'humidityValue').innerText = humidity + '%';
    document.getElementById(elementId: 'icon').src = 'http://openweathermap.org/img/wn/${icon}@2x.png';
    document.querySelector(selectors: '.form').style.display = 'none';
    document.querySelector(elementId: '.weather').style.display = 'block';
}


document.querySelector(selectors: 'input[type="text"]')
.addEventListener(type: 'keyup', listener: debouncedSearch);
// document.querySelector('input[type="text"]').addEventListener('keyup', debouncedSearch);

document.body.addEventListener(type:'click', listener: ev => {
    // console.log(ev);
    const li = ev.target;
    const {lat, lon, name} = li.dataset;
    localStorage.setItem('lat', lat);
    localStorage.setItem('lon', lon);
    localStorage.setItem('name', name);
    if (!lat){
        return;
    }
    showWeather(lat, lon, name);
});
document.getElementById(elementId: 'change').addEventListener(type: 'click', listener: () => {
    document.getElementById(elementId: 'weather').style.display = 'none';
    document.getElementById(selectors: 'form').style.display = 'block';
});
document.body.onload = () => {
    if (localStorage.getItem(key: 'lat'))')){
        const lat = localStorage.getItem(key: 'lat');
        const lon = localStorage.getItem(key: 'lon');
        const name = localStorage.getItem(key: 'name');
        showWeather(lat, lon, name);
    }