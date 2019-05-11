import React, { Component } from 'react';

import MovieCard from './movieCard.js';

class MovieList extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <ul>
          <MovieCard />
          <MovieCard />
          <MovieCard />
        </ul>
      </div>
    );
  }
}

export default MovieList;
