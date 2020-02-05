const express = require("express");
const app = express();
const hbs = require("hbs");
const mongoose = require("mongoose");
const Movies = require("./models/Movies");
const Users = require("./models/Users");
const PORT = 3000;

mongoose
  .connect("mongodb://localhost/movies", { useNewUrlParser: true })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to mongo", err));

app.set("views", __dirname + "/views");
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

app.get("/movies/:yearRequested/:sortOrder", (req, res) => {
  movies
    .find({ year: { $eq: Number(req.params.yearRequested) } })
    // .find()
    .select({ title: 1, director: 1, rate: 1, duration: 1, year: 1 })
    .sort({ rate: req.params.sortOrder === "asc" ? 1 : -1 })
    .then(movies => {
      // console.log(movies);
      res.json(movies);
    });
});

app.get("/newMovie", (req, res) => {
  Movies.create({
    title: "Nueva peli",
    year: 1979,
    director: "Gabri Zafra"
  }).then(movieCreated => {
    res.json(movieCreated);
  });
});

// http://localhost:3000/addNewUser
app.get("/addNewUser", (req, res) => {
  Users.create({
    name: "alf",
    salary: 100000,
    password: "patatas-fritas"
  }).then(newUserCreated => {
    res.json(newUserCreated);
  });
});

// http://localhost:3000/deleteUser
app.get("/deleteUser", (req, res) => {
  Users.deleteOne("5dcbff543dbb9a90b79a7277").then(deletedUser => {
    res.json({
      deletedUser: true,
      deletedUser
    });
  });
});

// http://localhost:3000/updateUser
app.get("/updateUser", (req, res) => {
  Users.findByIdAndUpdate("5dcc0051ec5e119120ed0850", { salary: 400000 }).then(updatedUser => {
    res.json({
      updated: true
    });
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
