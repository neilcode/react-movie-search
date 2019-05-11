import axios from 'axios';

export function popularMovies() {
  axios.get('http://localhost:3002/').then(response => {
    return { movies: response.data.results };
  })
  .catch(error => { console.log(error) });
};

