const dotenv = require('dotenv'); 
dotenv.config();

const port = process.env.PORT;
const API_KEY = process.env.TMDB_KEY

const express = require('express');
const app = express(); 

const axios = require('axios');

const movie_db = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  timeout: 2000,
  params: {
    api_key: API_KEY
  }
});

app.get('/', (req, res) => {
  movie_db.get('/popular')
    .then(function (api_response) {
      res.send(api_response.data);
    })
});

app.listen(port, () => console.log("Backend service listening on port", port))
