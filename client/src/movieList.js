import React from 'react';
import lodash from 'lodash';
import { Row, Col } from 'react-grid-system';
import './movieList.css';
import MovieCard from './movieCard.js';

const MovieList = ({ visibility, movies, fetchMovieDetails }) => {
  const itemsPerRow = 3;

  // chunks n movie results groups of 3
  const movieCardRows = lodash.chunk(
    movies.map(movie => { return <MovieCard fetchMovieDetails={fetchMovieDetails} {...movie} /> }),
    itemsPerRow
  );

  const display = visibility ? 'show' : 'hide'
  
  return (
    // className toggles visibility with CSS
    // maps over our result chunks and wraps 
    // each chunk in <Row> tags for grid layout.
    // each result is wrapped in <Col>. Grid
    // is 3 x ( n / 3 ) at fullsize.
    <div className={`movieList-${display}`}>
      { lodash.map(movieCardRows, (row, rowNum) => { 
        return (
          <Row key={rowNum}>
            { lodash.each(row, movieCard => { return <Col>{movieCard}</Col> })}
          </Row>
        )
      })}
    </div>
  );
}

export default MovieList;
