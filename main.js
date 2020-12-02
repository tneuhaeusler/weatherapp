const api = {
    key: "d9b2c4b2450b499ee445bbd4aa0d58b3",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}

document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        initApp();
    }
});

function initApp() {
    data = localStorage.getItem("zip");
    console.log(data);
    getResults(data);
};

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

const submit = document.querySelector('#search')
submit.addEventListener('click', setQuery)

const savezip = document.querySelector('#savezip')
savezip.addEventListener('click', makeHome)

const updatePersistentData = (zip) => {
    localStorage.setItem("zip", zip);
};

function makeHome(event) {
    data = searchbox.value;
    updatePersistentData(data);
}

function setQuery(event) {
    if (event.keyCode == 13) {
        getResults(searchbox.value);
    }
    else {
        getResults(searchbox.value); 
    }
}

function getResults (zipcode) {
    fetch(`${api.baseurl}weather?zip=${zipcode},US&units=imperial&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let iconElement = document.querySelector(".icon");
    iconElement.innerHTML= `<img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png" alt=""></img>`

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°f</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°f / ${Math.round(weather.main.temp_max)}°f`;
}

function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May",
                  "June", "July", "August", "September", "October",
                  "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday",
                "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

