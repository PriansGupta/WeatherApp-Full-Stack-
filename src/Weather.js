const request = require("request");

const weather = (address, callback) => {
  const url = "http://api.weatherstack.com/current?access_key=6b8c13b9f5a4d311ffbc74fd26622504&query="+address.lon+","+address.lat;


  request({ url: url, json: true }, (error, response) => {
    if (error) callback({ message: "" }, undefined);
    else if (response.body.error)
    {
      console.log(response.body.error)
      callback({ message: "" }, undefined);
    }
    else {
      const Temperature = response.body.current.temperature;
      const description = response.body.current.weather_descriptions[0];
      const Wspeed = response.body.current.wind_speed;
      const Humidity = response.body.current.humidity;
      const city = response.body.location.name;

      callback(undefined, {
        Place:address.Place,
        Temperature: Temperature,
        Weather: description,
        WindSpeed:Wspeed,
        Humidity,
        city
      });
    }
  });
};

module.exports = weather;

