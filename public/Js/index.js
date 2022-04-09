const findlocation = () => {
  const city = document.querySelector(".cityname");

  const success = (position) => {
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude,longitude);
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
