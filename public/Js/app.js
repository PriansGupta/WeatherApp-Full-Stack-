const findlocation = () => {
  const city = document.querySelector(".cityname");

  const success = (position) => {
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude, longitude);
    const geo = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
    fetch(geo)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        city.textContent = data.locality;
      });
  };
  const error = () => {
    city.textContent = "N/A";
  };
  navigator.geolocation.getCurrentPosition(success, error);
};
setTimeout(findlocation, 100);

const form = document.querySelector(".icon");
const Search = document.querySelector(".search");
const city = document.querySelector(".cityname");
const temp = document.querySelector(".temperature");

form.addEventListener("click", (e) => {
  console.log(Search.value);
  e.preventDefault();
  const location = Search.value;

  if (location.length !== 0) {
    fetch("http://localhost:3000/Search?address=" + location).then(
      (response) => {
        response.json().then((data) => {
          if (data.error || data.message) {
            temp.textContent = "N/A";
            city.textContent = data.message;
          } else {
            city.textContent = location;
            temp.textContent = data.Temperature;
            console.log(data.Temperature);
          }
        });
      }
    );
  } else {
    city.textContent = "Enter a location";
    temp.textContent = "N/A";
  }
});