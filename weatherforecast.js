function dateFormat(timestamp){
        const date=new Date(timestamp * 1000);
        console.log(date.toUTCString());
        console.log(date.toLocaleString());
        return date.toLocaleString();
    }
async function getFiveDays(city) {
    let container = document.getElementById("fiveDaysContainer");

    if (!container) {
        console.error("fiveDaysContainer not found");
        return;
    }

    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=9beb144b44d2fba2bd28531b823c83ff&units=metric`;
    let res = await fetch(url);
    let data = await res.json();

    container.innerHTML = "";

    let daily = data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
    );

    daily.slice(0, 5).forEach(item => {
        let date = new Date(item.dt * 1000);

        container.innerHTML += `
            <div class="row1">
                <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" width="25">
                <h6>${Math.round(item.main.temp)} &deg;C</h6>
                <h6>${date.toLocaleDateString('en-US', { weekday: 'long' })}</h6>
                <h6>${date.toLocaleDateString()}</h6>
            </div>
        `;
    });
}
async function getTodayHourly(city) {
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=9beb144b44d2fba2bd28531b823c83ff&units=metric`;
    let res = await fetch(url);
    let data = await res.json();

    let container = document.getElementById("todayContainer");
    container.innerHTML = "";

    // Take first 5 time slots (today only)
    let hourly = data.list.slice(0, 5);

    hourly.forEach(item => {
        let time = new Date(item.dt * 1000).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });

        container.innerHTML += `
            <div class="todayCard">
                <div class="todayTime">${time}</div>
                <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" width="35">
                <div class="todayTemp">${Math.round(item.main.temp)}°C</div>
            </div>
        `;
    });
}
async function fetchdata()
{
     let cityname= document.getElementById("userLocation").value;
    console.log('cityname is:',cityname);
    let requestdata=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=9beb144b44d2fba2bd28531b823c83ff&units=metric`);
    let formatteddata=await requestdata.json();
    console.log('formatted data is:',formatteddata); 
    let rescityname=formatteddata.name;
    console.log(rescityname);
    let resdegree=formatteddata.main.temp;
    console.log(resdegree);
    let resdescription=formatteddata.weather[0].description;
    console.log(resdescription);
   /* $('#cityname')[0].innerText=rescityname;*/
    document.getElementById("cityname").innerText = rescityname;
    document.getElementById("degrees").innerText = resdegree;
    document.getElementById("description").innerText = resdescription;
    let properdate=dateFormat(formatteddata.dt);
    let date=properdate.split(',')[0]
    let time=properdate.split(',')[1]
    console.log("date and time are:",date,time);
    document.getElementById("date").innerText = date;
    document.getElementById("time").innerText = time;
    let sunrise=formatteddata.sys.sunrise;
    let sunset=formatteddata.sys.sunset;
    let propersunrise=dateFormat(sunrise);
    let propersunset=dateFormat(sunset);
    let rise=propersunrise.split(',')[1];
    let set=propersunset.split(',')[1];
    document.getElementById("s1value").innerText = rise;
    document.getElementById("s2value").innerText = set;
    let humidity=formatteddata.main.humidity;
    let windspeed=formatteddata.wind.speed;
    let clouds=formatteddata.clouds.all;
    let uvindex=formatteddata.main.feels_like;
    let pressure=formatteddata.main.pressure;
    console.log("humidity is:",humidity);
    document.getElementById("hvalue").innerText = humidity;
    document.getElementById("wvalue").innerText = windspeed;
    document.getElementById("cvalue").innerText = clouds;
    document.getElementById("uvalue").innerText = uvindex;
    document.getElementById("pvalue").innerText = pressure;
    getFiveDays(cityname);
    getTodayHourly(cityname);
}   


