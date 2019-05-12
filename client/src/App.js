import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import MovieList from './movieList.js'
import SingleMovieCard from './singleMovieCard.js'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props);

    this.searchMovies = this.searchMovies.bind(this);
    this.fetchMovieDetails = this.fetchMovieDetails.bind(this);

    this.state = {
      movieSearchTerm: '',
      movies: [],
      movieHasFocus: false,
      focusedMovie: {}
    }
  }
  
  componentDidMount() {
  // populate the page with the most popular movies
    axios.get('http://localhost:3002/')
      .then(response => {
        this.setState({ movies: response.data.results })
      })
      .catch(error => {
        console.log(error)
      })
  }

  fetchMovieDetails(movieId) {
    axios.get('http://localhost:3002/movies/' + movieId)
      .then(response => {
        this.setState({ movieHasFocus: true, focusedMovie: response.data })
      })
      .catch(error => {
        console.log(error)
      })
  }

  searchMovies(e) {
    e.preventDefault();
    axios.get('http://localhost:3002/search', {
      params: {
        title: this.state.movieSearchTerm
      }
    })
    .then(response => {
      this.setState({ movies: response.data.results })
    })
  }

  render() {
    const { movieHasFocus, movieSearchTerm, movies, focusedMovie } = this.state;
    return (
      <Container>
        <Row>
          <Col>
            <form className='searchBar'>
              <input 
                placeholder='Search for a film...'
                value={movieSearchTerm}
                onChange={event => this.setState({ movieSearchTerm: event.target.value})} />
              <button onClick={(e) => { this.searchMovies(e) }}>
                Go
              </button>
            </form>
          </Col>
        </Row>
        <Row>
          <SingleMovieCard visibility={movieHasFocus} movie={focusedMovie} />
        </Row>
        <MovieList 
          movies={movies} 
          fetchMovieDetails={this.fetchMovieDetails} />
      </Container>
    );
  }
}

export default App;
