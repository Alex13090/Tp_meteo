
// create variable link json
const url ="https://www.prevision-meteo.ch/services/json/";
// get button

const btnSend = document.querySelector("form input[value = 'envoyer']");
// listen onto clic
btnSend.addEventListener("click", event => requestApi(event));
// function for request from datasheet
function requestApi(event) {
    event.preventDefault();
    // get input of city
    const city = document.querySelector("form input[name = 'city']");
    // get id for display
    const display = document.getElementById("display");
    console.log(city.value);
    // send request to get info from link
    fetch(`${url}${city.value}`)
    // then put to json depending on response
    .then(response => response.json())
    // then draft the data
    .then(data => {
        console.log('success:', data);
        // create table for 4 other days
        let forecastDay = [
            data.fcst_day_0,
            data.fcst_day_1,
            data.fcst_day_2,
            data.fcst_day_3,
            data.fcst_day_4,
        ];
        // loop for 5 other days
        forecastDay.forEach(day =>{
            // for first day
            if (day === data.fcst_day_0) {
                // create all elements
                let h2City = document.createElement("h2");
                let h4Hour = document.createElement("h4");
                let h4Cond = document.createElement("h4");
                let txt = document.createTextNode("Conditions actuelles;")
                let img = document.createElement("img");
                img.setAttribute("src", "");
                let pTemp = document.createElement("p");
                let pWing = document.createElement("p");
                let pCloud = document.createElement("p");
                // add content inside
                h2City.textContent = `Meteo pour ${data.city_info.name}, ${data.city_info.country}`;
                h4Hour.textContent = `${day.date}, ${data.current_condition.hour}`;
                display.appendChild(h2City);
                display.appendChild(h4Hour);
                h4Cond.appendChild(txt);
                display.appendChild(h4Cond);
                img.src = day.icon_big;
                pTemp.textContent = `Température: ${data.current_condition.tmp}°C`;
                pWing.textContent = `Vent: ${data.current_condition.wnd_spd} Km/h, ${data.current_condition.wnd_dir}`;
                pCloud.textContent = `${day.condition}`;
                // display in HTML
                display.appendChild(img);
                display.appendChild(pTemp);
                display.appendChild(pWing);
                display.appendChild(pCloud);
                // for the others day
           } if (day !== data.fcst_day_0) {
                let h4Date = document.createElement("h4");
                let icon = document.createElement("img");
                let pCond = document.createElement("p");
                let pTempMax = document.createElement("p");
                h4Date.textContent = `${day.day_long}, ${day.date}`;
                icon.setAttribute("src", `${day.icon_big}`);
                pCond.textContent = `${day.condition}`;
                pTempMax.textContent = `Température minimale: ${day.tmin}°C, Température maximale: ${day.tmax}°C`;
                display.appendChild(h4Date);
                display.appendChild(icon);
                display.appendChild(pCond);
                display.appendChild(pTempMax);
            }
            // hour by hour
            let h4 = document.createElement("h4");
            h4.textContent = `Evolution de la journée heure par heure`;
            display.appendChild(h4);
            // loop for 24H
            for(let i = 0; i <= 23; i++) {
                let div = document.createElement("div");
                let span1 = document.createElement("span");
                let span2 = document.createElement("span");
                let img1 = document.createElement("img");
                img1.setAttribute("src", `${day.hourly_data[`${i}H00`].ICON}`);
                // object with value in string
                span1.textContent = `${i}H00`;
                span2.textContent = `${day.hourly_data[`${i}H00`].CONDITION}`;
                div.appendChild(span1);
                div.appendChild(img1);
                div.appendChild(span2);
                display.appendChild(div);
            }
        })
    })
    // if error
    .catch((error) => {
        console.error('Error:', error);
    });
}