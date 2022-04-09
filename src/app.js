const express = require("express");
const weather = require("./Weather");
const Geocode = require("./Geocode");
const path = require("path");
const hbs = require("hbs");

const app = express();

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

app.get("/about", (req, res) => {
  res.render("about", {
    Title: "About",
  });
});

app.get("/about/*", (req, res) => {
  res.render("Error", {
    Data: "Nothing about found",
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

app.get("*", (req, res) => {
  res.render("Error", {
    Data: "No such Page Found",
  });
});

app.listen(3000, () => {

});
