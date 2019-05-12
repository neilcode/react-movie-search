import React, { Component } from 'react';

import MovieList from './movieList.js'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props);

    this.submitSearch = (e) => {
      e.preventDefault();
      console.log(this.state.movieSearchTerm);
    }

    this.state = {
      movieSearchTerm: '',
      movies: []
    }
  }
  
  componentDidMount() {
    axios.get('http://localhost:3002/')
      .then(response => {
        this.setState({ movies: response.data.results })
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
        <MovieList movies={this.state.movies} />
      </div>
    );
  }
}

export default App;
