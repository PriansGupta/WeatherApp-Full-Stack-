const request = require("request");
const weather = require("./Weather");

const Geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=1&access_token=pk.eyJ1IjoicHJpYW5zIiwiYSI6ImNsMGp4dWdwajBoMWkzZHVvM2IwenZkc3oifQ.jLETuenG2e14hTyin_oJCA`;

  request({ url: url, json: true }, (error, response) => {
    if (error) callback({ message: "Unable to connect" }, undefined);
    else if (response.body.features.length === 0)
      callback({ message: "Not found" }, undefined);
    else {
      const lat = response.body.features[0].center[0];
      const lon = response.body.features[0].center[1];
      callback(undefined, { latitude: lat, longitude: lon });
    }
  });
};
module.exports = Geocode;
