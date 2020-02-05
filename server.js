const express = require("express");
const mongoose = require("mongoose");
const app = express();
const faker = require("faker");
const Movies = require("./models/Movies");

mongoose
  .connect("mongodb://localhost/movies", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to mongo", err));

function getCities() {
  // in real life this would be replaced by a database call
  let cities = ["Miami", "Madrid", "Barcelona", "Buenos Aires"];

  return cities;
}
// as per the learning unit MVC pattern image -> https://i.imgur.com/LUhoPkS.png
// controller
app.get("/cities", (request, response) => {
  //data generation --> model
  let modelData = getCities();

  //view preparation and render
  let html = modelData.map(city => `<li>${city}</li>`);

  response.write(`<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
  </head>
  <body>
    <h1>${html}</h1>
  </body>
  </html>`);
});

app.get("/movies", (req, res) => {
  Movies.find()
    // .select({ title: 1 })
    .then(allMovies => {
      console.log(allMovies);
      res.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        <h1>Total movies: ${allMovies.length}</h1>
      <ul>${allMovies.map(
        movie =>
          `<li><a href="http://localhost:3000/movieDetail/${movie._id}">${movie.title}</a> <a href="http://localhost:3000/deleteMovie/${movie._id}">🗑</a></li>`
      )}</ul>
    </body>
    </html>`);
    });
});

app.get("/deleteMovie/:movieId", (req, res) => {
  Movies.findByIdAndDelete(req.params.movieId).then(() => {
    // offering feedback to the user
    // res.write(`<!DOCTYPE html>
    //     <html lang="en">
    //     <head>
    //         <meta charset="UTF-8">
    //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //         <meta http-equiv="X-UA-Compatible" content="ie=edge">
    //         <title>Document</title>
    //     </head>
    //     <body>
    //         <a href="http://localhost:3000/movies">Back to all movies, molas mazo</a>
    //       <h1>Movie with id ${req.params.movieId} has been deleted</h1>
    //     </body>
    //     </html>`);

    res.redirect("/movies");
  });
});

app.get("/movieDetail/:movieId", (req, res) => {
  Movies.findById(req.params.movieId).then(allMovieDetails => {
    res.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
      <h1>${allMovieDetails.title}</h1>
      <h2>${allMovieDetails.year}</h2>
      <h3>Director: ${allMovieDetails.director}</h3>
    </body>
    </html>`);
  });
});

app.get("/moviesByYear/:year?", (req, res) => {
  console.log(req.params.year);

  Movies.find(req.params.year === undefined ? {} : { year: +req.params.year })
    // .select({ title: 1 })
    .then(allMovies => {
      console.log(allMovies);
      res.write(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
        </head>
        <body>
          <h1>Total movies ${allMovies.length}</h1>
          <ul>${allMovies.map(
            movie =>
              `<li><a href="http://localhost:3000/movieDetail/${movie._id}">${movie.title} (${movie.year})</a></li>`
          )}</ul>
        </body>
        </html>`);
    });
});

app.get("/updateMovie", (req, res) => {
  Movies.findByIdAndUpdate("5dcbee1045b84480e22b6e3a", {
    title: "Matrix updated" + Math.random()
  }).then(() => {
    res.redirect("/movies");
  });
});

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

app.get("/addMovie", (req, res) => {
  Movies.create({
    title: `${faker.commerce.product()} ${faker.commerce.product()} ${faker.commerce.product()}`,
    year: randomInt(1980, 2020),
    director: `${faker.name.findName()}`
  }).then(movieCreated => {
    res.write(`
        <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
  </head>
  <body>
      <h1>Movie created! ${movieCreated.title}</h1>
  </body>
  </html>`);
  });
});

app.listen(3000, () => {
  console.log("listening to port 3000");
});
