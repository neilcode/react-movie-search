import React, { Component } from 'react';
import { Container, Row } from 'react-grid-system';
import axios from 'axios'
import MovieList from './movieList.js'
import SingleMovieCard from './singleMovieCard.js'
import SearchBar from './searchBar.js'
import './App.css'

const moviesDb = 'http://localhost:3002';

class App extends Component {
  constructor(props) {
    super(props);

    // These functions need to be passed to child components
    // in order to update the App state
    this.searchMovies = this.searchMovies.bind(this);
    this.collapseCard = this.collapseCard.bind(this);
    this.fetchMovieDetails = this.fetchMovieDetails.bind(this);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);

    this.state = {
      focusedMovie: {},
      movieHasFocus: false,
      movieSearchTerm: '',
      mostPopularMovies: [],
      nowPlaying: [],
      movies: []
    }
  }
  
  //
  // According to the requirements, we want to populate
  // the view with popular movies by default. The best 
  // place to do background data fetching is in 
  // componentDidMount. We also cache the most popular
  // movie set so that we can restore the default view
  // without re-fetching the data. I added the feature 
  // to also see Now Playing movies. Both get pulled 
  // from the backend and delivered in a single 
  // payload.
  componentDidMount() {
    axios.get(`${moviesDb}/most_popular`)
      .then(response => {
        this.setState({ 
          mostPopularMovies: response.data,
          movies: response.data
        })
      })
      .catch(error => {
        console.log(error)
      })

    axios.get(`${moviesDb}/now_playing`)
      .then(response => {
        this.setState({
          nowPlaying: response.data
        })
      })
  }

  viewMostPopular() {
    this.setState({ 
      movieHasFocus: false,
      focusedMovie: {},
      movies: this.state.mostPopularMovies 
    });
  }

  viewNowPlaying() {
    this.setState({ 
      movieHasFocus: false,
      focusedMovie: {},
      movies: this.state.nowPlaying 
    });
  }
  
  //
  // Updates the value of the movieSearchTerm in App state.
  // This is wired up to the onChange event in the search bar
  // which could be used to pre-fetch results or if we wanted 
  // to implement autocomplete.
  handleSearchInputChange(event) {
    this.setState({ movieSearchTerm: event.target.value })
  }

  //
  // Fetches data from the MovieDB /movie/:id API Endpoint
  // Upon success, updates global app state to reflect that
  // a single movie should have 'focus' on the single-page
  // app. Focusing a single movie hides the rest of the 
  // results.
  //
  fetchMovieDetails(movieId) {
    axios.get(`${moviesDb}/movies/${movieId}`)
      .then(response => {
        this.setState({ movieHasFocus: true, focusedMovie: response.data })
      })
      .catch(error => {
        console.log(error)
      })
  }

  // Hides the SingleMovieCard by updating global app state
  // to reflect that the focusedMovie has been cleared
  // this will make the Results list visible once more.
  collapseCard(event) {
    this.setState({ movieHasFocus: false, focusedMovie: {} })
  }

  // Reads passes the value of movieSearchTerm to the backend 
  // server to proxy the query to the MovieDB API and updates 
  // the `movies` result set upon success If an error occurs, 
  // the movie results stay as they are.
  searchMovies(e) {
    e.preventDefault();
    axios.get(`${moviesDb}/search`, {
      params: {
        title: this.state.movieSearchTerm
      }
    })
    .then(response => {
      this.setState({ movies: response.data.results })
    })
    .catch(error => {
      console.log(error);
    })
  }

  render() {
    const { movieHasFocus, movieSearchTerm, movies, focusedMovie } = this.state;
    return (
      //Container scaffolds a responsive grid system for our card UI
      <Container>
        <Row>
          <span className='quicklink' onClick={()=>{this.viewMostPopular()}}>Most Popular</span>
          <span className='quicklink' onClick={()=>{this.viewNowPlaying()}}>Now Playing</span>
        </Row>
        <SearchBar 
          restoreDefaultView={this.restoreDefaultView}
          searchMovies={this.searchMovies}
          handleSearchInputChange={this.handleSearchInputChange}
          movieSearchTerm={movieSearchTerm} />
        <SingleMovieCard 
          collapseCard={this.collapseCard} 
          visibility={movieHasFocus} 
          {...focusedMovie} />
        <MovieList 
          movies={movies} 
          visibility={!movieHasFocus}
          fetchMovieDetails={this.fetchMovieDetails} />
      </Container>
    );
  }
}

export default App;
