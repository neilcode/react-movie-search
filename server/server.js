const dotenv  = require('dotenv'); 
const cors    = require('cors')
const express = require('express');
const app     = express(); 
const axios   = require('axios');
const lodash  = require('lodash');

// Setup configuration
dotenv.config();
const API_KEY = process.env.TMDB_KEY
//
// Because I chose to separate client and server
app.use(cors({
  origin: '*'
  //In a production environment we would want to 
  //whitelist specific origins
}));

const movie_db = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 2000,
  params: {
    api_key: API_KEY
  }
});

// ROUTES

//
// fetch the first page of popular movies from
// TMDB and forward the response.
app.get('/most_popular', (req, res) => {
  movie_db.get(
    '/movie/popular'
  )
  .then(api_response => {
    res.send(api_response.data.results);
  })
  .catch(error_response => { console.log(error_response) }); // Normally we'd want proper error logging in production!
});

//
// fetch the first page of Now Playing movies
// from TMDB and forward response.
app.get('/now_playing', (req, res) => {
  movie_db.get(
    '/movie/now_playing'
  )
  .then(api_response => {
    res.send(api_response.data.results);
  })
  .catch(error_response => { console.log(error_response) }); // Normally we'd want proper error logging in production!
});

//
// search route captures anything from the 'title' query string parameters and
// sends to the MovieDB search endpoint. In a production system we would want to 
// sanitize the input. Sanitization could also be implemented in the Client UI.
// I've included the flag to omit adult movies after searching for 'Open Season'. 
// Yikes.
app.get('/search', (req, res) => {
  movie_db.get('/search/movie', {
    params: {
      query: req.query.title,
      include_adult: false
    }
  })
  .then(api_response => {
    res.send(
      // filter out results that don't have images since it makes for a bad
      // UX experience. If i'd had more time I would have made a placeholder
      // svg to stub out the missing posters, but as it is the only results 
      // which lack images are obscure movies anyway.
      lodash.filter(
        api_response.data.results,
        (result) => { return result.poster_path != null }
      )
    );
  })
  .catch(error_response => {
    console.log(error_response);
  })
})

//
// Fetch details for a specific specific film
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

app.listen(3002, () => console.log("Backend service listening on 3002"))
