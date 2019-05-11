import React, { Component } from 'react';

import MovieCard from './movieCard.js';

class MovieList extends Component {
  //constructor({ movies }) {
    //super(props);

    //this.state
  //}
  
  render() {
    const { movies } = this.props;
    const cards = movies.map(movie => { 
      return <MovieCard 
        key={movie.id} 
        title={movie.title}/> 
    });

    return (
      <div>
        <ul>{ cards }</ul>
      </div>
    );
  }
}

export default MovieList;
