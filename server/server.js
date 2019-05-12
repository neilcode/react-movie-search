const dotenv = require('dotenv'); 
dotenv.config();

const cors = require('cors')

const port = process.env.PORT;
const API_KEY = process.env.TMDB_KEY

const express = require('express');
const app = express(); 

const axios = require('axios');

const movie_db = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 2000,
  params: {
    api_key: API_KEY
  }
});

// Because I chose to separate client and server
app.use(cors({
  origin: 'http://localhost:3000'
}));

// ROUTES

app.get('/most_popular', (req, res) => {
  movie_db.get(
    '/movie/popular'
  )
  .then(function (api_response) {
    res.send(api_response.data.results);
  })
  .catch(error_response => { console.log(error_response) });
});

app.get('/now_playing', (req, res) => {
  movie_db.get(
    '/movie/now_playing'
  )
  .then(function (api_response) {
    res.send(api_response.data.results);
  })
  .catch(error_response => { console.log(error_response) });
});
// search route captures anything from the 'title' query string parameters and
// sends to the MovieDB search endpoint. In a production system we would want to 
// sanitize the input. Sanitization could also be implemented in the Client UI.
app.get('/search', function (req, res) {
  movie_db.get('/search/movie', {
    params: {
      query: req.query.title,
      include_adult: false
    }
  })
  .then(function (api_response) {
    res.send(api_response.data);
  })
  .catch(function (error_response) {
    console.log(error_response);
  })
})

app.get('/movies/:movieId', (req, res) => {
  movie_db.get(
    '/movie/' + req.params.movieId
  )
  .then(api_response => {
    res.send(api_response.data);
  })
  .catch(error_response => {
    console.log(error_response);
  })
});

app.listen(port, () => console.log("Backend service listening on port", port))
