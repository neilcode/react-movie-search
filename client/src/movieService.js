import axios from 'axios';

export function popularMovies() {
  axios.get('http://localhost:3002/').then(response => {
    return response.data;
  })
};

