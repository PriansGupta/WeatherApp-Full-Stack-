const request = require("request");

const weather = (address, callback) => {
  const url = "http://api.weatherstack.com/current?access_key=449b8cf20027e2f7ddf7c69940787eda&query="+address.lon+","+address.lat;

  request({ url: url, json: true }, (error, response) => {
    if (error) callback({ message: "Unable to connect" }, undefined);
    else if (response.body.error)
    {
      console.log(response.body.error)
      callback({ message: "Unable to connect" }, undefined);
    }
    else {
      const Temperature = response.body.current.temperature;
      const description = response.body.current.weather_descriptions[0];

      callback(undefined, {
        Place:address.Place,
        Temperature: Temperature,
        Weather: description,
      });
    }
  });
};

module.exports = weather;
