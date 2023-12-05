const wrapper = document.querySelector(".wrapper");
const inputPart = document.querySelector(".input-part");
const infoTxt = document.querySelector(".info-txt");
const inputField = document.querySelector("input");
const locationBtn = document.querySelector("button");
const weatherPart = wrapper.querySelector(".weather-part");
const wIcon = document.querySelector("img");
const arrowBack = wrapper.querySelector("header i");

let api;
let concatStrings = splitString[0] + splitString[1],
    lastString = ["c", "7", "e", "e"],
    reverseString = lastString.reverse().join("");

inputField.addEventListener("keyup", e => {
    // if user pressed enter btn and input value is not empty
    if (e.key === "Enter" && inputField.value !== "") {
        requestApi(inputField.value);
        inputField.blur();
    }
});

locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) { // if browser support geolocation api
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert("Your browser not support geolocation api");
    }
});

function requestApi(city) {
    const key = reverseString + concatStrings;
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
    fetchData();
}

function onSuccess(position) {
    const {latitude, longitude} = position.coords; // getting lat and lon of the user device from coords obj
    const key = reverseString + concatStrings;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`;
    fetchData();
}

function onError(error) {
    infoTxt.classList.add("error");
    //
    infoTxt.innerText = error.message;
}

function fetchData() {
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    // Fetach api uzyty Json
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() => {
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = "Something went wrong";
    });
}

function weatherDetails(info) {
    if (info.cod === "404") { // if user entered city name isn't valid
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
    } else {
        //getting required properties value from the whole weather information
        const city = info.name;
        let country = info.sys.country;
        const {description, id} = info.weather[0];
        const {temp, feels_like, humidity} = info.main;

        for (i in listCountry) {
            if (i === country) {
                country = listCountry[i];
            }
        }

        // custom weather icon according to the id which api gives to us
        if (id === 800) {
            wIcon.src = "img/clear.svg";
        } else if (id >= 200 && id <= 232) {
            wIcon.src = "img/storm.svg";
        } else if (id >= 600 && id <= 622) {
            wIcon.src = "img/snow.svg";
        } else if (id >= 701 && id <= 781) {
            wIcon.src = "img/haze.svg";
        } else if (id >= 801 && id <= 804) {
            wIcon.src = "img/cloud.svg";
        } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
            wIcon.src = "img/rain.svg";
        }

        //passing a particular weather info to a particular element
        weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
        weatherPart.querySelector(".weather").innerText = description;
        weatherPart.querySelector(".location span").innerText = `${city}, ${country}`;
        weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
        setTimeout(() => {
            infoTxt.classList.remove("pending", "error");
            infoTxt.innerText = "";
            inputField.value = "";
            wrapper.classList.add("active");
        }, 800);
    }
}

arrowBack.addEventListener("click", () => {
    wrapper.classList.remove("active");
});