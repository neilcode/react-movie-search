import React, { Component } from 'react';
import './App.css';

import { popularMovies } from './movieService.js'
import MovieList from './movieList.js'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props);

    this.submitSearch = (e) => {
      e.preventDefault();
      debugger;
      console.log(this.state.movieSearchTerm);
    }

    this.state = {
      movieSearchTerm: '',
      movies: ['notamovie']
    }
  }
  
  componentDidMount() {
    axios.get('http://localhost:3002/', { crossdomain: true })
      .then(response => {
        this.setState({ movies: response.data })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <div>
        <form className='searchBar' onSubmit={this.submitSearch}>
          <input 
            placeholder='Search for a film...'
            value={this.state.movieSearchTerm}
            onChange={event => this.setState({ movieSearchTerm: event.target.value})} />
          <button onClick={this.submitSearch}>
            Go
          </button>
        </form>
        <MovieList props={this.state.movies} />
      </div>
    );
  }
}

export default App;
