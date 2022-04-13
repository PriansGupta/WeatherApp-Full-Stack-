const Search = document.querySelector(".search");
const form = document.querySelector(".icon");
const city = document.querySelector(".cityname");
const temp = document.querySelector(".temperature");
const weather = document.querySelector(".weather");
const speed = document.querySelector(".windspeed");
const humidity = document.querySelector(".humidity");
const time = document.querySelector(".clock");
const date = document.querySelector(".Date");
const Day = document.querySelector(".Day");
const background = document.querySelector(".background");

const Weather = (location) => {
  city.textContent = "Loading...";
  temp.textContent = "...";
  weather.textContent = "...";
  humidity.textContent = "...";
  speed.textContent = "...";

  if (location.length !== 0) {
    fetch("Search?address=" + location).then((response) => {
      response.json().then((data) => {
        if (data.error || data.message) {
          temp.textContent = "N/A";
          city.textContent = data.message;
          weather.textContent = "N/A";
          speed.textContent = "N/A";
          humidity.textContent = "N/A";
        } else {
          speed.textContent = data.WindSpeed + "m/s";
          weather.textContent = data.Weather;
          city.textContent = location;
          temp.textContent = data.Temperature;
          humidity.textContent = data.Humidity + "%";
          console.log(data.Temperature);
        }
      });
    });
  } else {
    city.textContent = "Enter a location";
    temp.textContent = "N/A";
    weather.textContent = "N/A";
  }
  Search.value = "";
};

const findlocation = () => {
  const city = document.querySelector(".cityname");

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const geo = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
    fetch(geo)
      .then((res) => res.json())
      .then((data) => {
        Weather(data.locality);
        city.textContent=data.locality
      });
  };
  const error = () => {
    city.textContent = "N/A";
  };
  navigator.geolocation.getCurrentPosition(success, error);
};
setTimeout(findlocation, 100);

form.addEventListener("click", (e) => {
  e.preventDefault();
  Weather(Search.value);
});



function Clock() {
  let rtClock = new Date();

  let Format = rtClock.toString();
  let DateAndMonth = Format.substring(4, 15).toUpperCase();
  let day = Format.substring(0, 3).toUpperCase();
  date.textContent = DateAndMonth;
  Day.textContent = day;

  let hours = rtClock.getHours();
  let mins = rtClock.getMinutes();
  let secs = rtClock.getSeconds();

  let ampm = hours < 12 ? "AM" : "PM";

  hours = hours > 12 ? hours - 12 : hours;

  hours = ("0" + hours).slice(-2);
  mins = ("0" + mins).slice(-2);
  secs = ("0" + secs).slice(-2);

  let value = hours + ":" + mins + ":" + secs + ":" + ampm;
  time.textContent = value;

  let t = setTimeout(Clock, 500);
}

Clock();
