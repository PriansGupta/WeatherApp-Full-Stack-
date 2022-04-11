const express = require("express");
const weather = require("./Weather");
const Geocode = require("./Geocode");
const path = require("path");
const hbs = require("hbs");

const app = express();
const port=process.env.PORT || 3000

const partialsPath = path.join(__dirname, "../public/templates/partials");


app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../public/templates/views"));
hbs.registerPartials(partialsPath);

app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
  res.render("index", {
    Title: "Weather",
  });
});


app.get("/Search", (req, res) => {
  if (!req.query.address) return res.send("Please provide an Address");

  const name = req.query.address;

  Geocode(name, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      weather({ lat: data.latitude, lon: data.longitude,Place:name }, (error, data) => {
        if (error) res.send(error);
        else {
          res.send(data);
        }
      });
    }
  });
});


app.listen(port, () => {

});
