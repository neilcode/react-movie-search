import React from 'react';
import { Row, Col } from 'react-grid-system';
import './searchBar.css';

const SearchBar = ({ restoreDefaultView, movieSearchTerm, searchMovies, handleSearchInputChange }) => {
  return(
    <Row className='warp'>
      <Col>
        <form className='search' onSubmit={ e => { searchMovies(e) }}>
          <input
            className='searchTerm'
            type='text'
            placeholder='Search for a film...'
            value={movieSearchTerm}
            onChange={e => handleSearchInputChange(e)} />
        </form>
      </Col>
    </Row>
  )
}

export default SearchBar;
