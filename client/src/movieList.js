import React from 'react';
import MovieCard from './movieCard.js';

const MovieList = ({ movies }) => {
  const cards = movies.map(movie => { 
    return <MovieCard {...movie} /> 
  });

  return (
    <div>
      { cards }
    </div>
  );
}

export default MovieList;
