import React from 'react';
import './movieCard.css';

const MovieCard = (props) => {
  const { fetchMovieDetails, id } = props;
  return (
    <div className='card' onClick={() => fetchMovieDetails(id)}>
      <MovieCardHeader {...props}/>
      <MovieCardBody {...props}/>
    </div>
  );
}

export default MovieCard;

const MovieCardHeader = ({ poster_path }) => {
  const poster_img = poster_path ? 'url(https://image.tmdb.org/t/p/w400' + poster_path + ')' : null;

  var style = { 
    backgroundImage: poster_img
  };

  return (
    <header style={style} className="card-header"/>
  )
}

const MovieCardBody = ({ title, overview, release_date }) => {
  return (
    <div className="card-body">
      <h4 className="card-body--title">{title}</h4>
      <p className="date">Released: { release_date }</p>
      
      <p className="body-content">
        { overview.length > 200 ? overview.substring(0,200) + '...(click for more)' : overview }
      </p>
    </div>
  )
}

