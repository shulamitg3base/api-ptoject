
let locationInp;
let submitBtn;
let title;
let weatherChart;

let userLocation;
document.addEventListener("DOMContentLoaded", function () {

    locationInp = document.getElementById('location-js');
    submitBtn = document.getElementById('submit-js');
    title = document.getElementById('title-js');
    weatherChart = document.getElementById('weather-chart-js');

    locationInp.addEventListener('change', (event) => userLocation = event.target.value)
    submitBtn.addEventListener('click', submit)

})

function createDayObject(day, dayInWeek) {
    let dayHTML = document.createElement('div');
    dayHTML.setAttribute('class', 'weather-chart__day');
    weatherChart.appendChild(dayHTML);
    let dayTitle = document.createElement('div');
    dayTitle.setAttribute('class', 'weather-chart__day--title')
    dayTitle.innerHTML = dayToString(dayInWeek)+ " "
    let icon = document.createElement('i');
    icon.setAttribute('class', getIcon(day.weather[0].main));
    dayTitle.appendChild(icon);
    dayHTML.appendChild(dayTitle);
    let description = document.createElement('div');
    description.innerHTML = day.weather[0].description + ' ';
    description.setAttribute('class', 'weather-chart__day--description');
    dayHTML.appendChild(description);
    let temp = document.createElement('div');
    temp.innerHTML = day.main.temp+ ' c';
    temp.setAttribute('class', 'weather-chart__day--temp');
    dayHTML.appendChild(temp);
    let tempRange = document.createElement('div');
    tempRange.innerHTML =`${day.main.temp_min} c-${day.main.temp_max} c`;
    dayHTML.appendChild(tempRange);
    let wind =  document.createElement('div');
    wind.innerHTML =`wind ${day.wind.speed} m/s`;
    dayHTML.appendChild(wind);
    let clouds =  document.createElement('div');
    clouds.innerHTML = `clouds ${day.clouds.all}%`;
    dayHTML.appendChild(clouds);
}

function dayToString(date) {
    switch (date) {
        case 0: return 'Sunday';
        case 1: return 'Monday';
        case 2: return 'Tuesday';
        case 3: return 'Wednesday';
        case 4: return 'Thursday';
        case 5: return 'Friday';
        case 6: return 'Saturday';
    }
}

function getIcon(icon) {
    switch (icon) {
        //return "fas fa-cloud-showers-heavy";
        case "Snow":  return "far fa-snowflake";
        case "Rain":return "fas fa-cloud-rain";
        case "Clouds": return "fas fa-cloud";
        case "Clear": return"fas fa-sun";
    }
}

function submit() {
    if (userLocation !== "") {
        weatherChart.innerHTML = "";
        fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + userLocation +
            '&appid=daa943d285196ba52a5b6b1b252ffb3c&units=metric')
            .then((response) => {
                return response.json();
            })
            .then((weatherJson) => {
                if (weatherJson.cod === '200') {

                    console.log(weatherJson);
                    let date = new Date();
                    title.innerHTML = `The weather in ${weatherJson.city.name} ${weatherJson.city.country}`
                    // weatherJson.list.forEach(element => {
                    //     createDayObject(element, date.getDay())
                    //     date.setDate(date.getDate() + 1);
                    // });
                    for(let i=0;i<weatherJson.list.length;i+=8){
                        createDayObject(weatherJson.list[i], date.getDay());
                        date.setDate(date.getDate() + 1);
                    }
                }
                else {
                    title.innerHTML = weatherJson.message;
                }
            });
    }
}