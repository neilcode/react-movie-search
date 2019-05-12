import React from 'react';
import { Row, Col } from 'react-grid-system';
import MovieCard from './movieCard.js';
import lodash from 'lodash';
const _ = lodash;

const MovieList = ({ movies, fetchMovieDetails }) => {
  const itemsPerRow = 3;

  // Take an unknown number of movie results and chunk them into groups of 3
  // This gives a nice 3-column grid without a lot of cruft.
  const movieCardRows = _.chunk(
    movies.map(movie => { return <MovieCard fetchMovieDetails={fetchMovieDetails} {...movie} /> }),
    itemsPerRow
  );

  return (
    <div>
      { _.map(movieCardRows, (row, rowNum) => { 
        return(
          <Row key={rowNum}>
            { _.each(row, movieCard => { 
              return(
                <Col>
                  {movieCard}
                </Col>
              ) 
            })}
          </Row>
        )
      })}
    </div>
  );
}

export default MovieList;
