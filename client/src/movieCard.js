import React from 'react';
import './movieCard.css';

const MovieCard = (props) => {
  return (
    <div className='card' key={props.id}>
      <MovieCardHeader {...props}/>
      <MovieCardBody {...props}/>
    </div>
  );
}

export default MovieCard;

const MovieCardHeader = ({ title, poster_path }) => {
  const poster_img = 'https://image.tmdb.org/t/p/w200' + poster_path;

  var style = { 
      backgroundImage: 'url(' + poster_img + ')',
  };

  return (
    <header style={style} className="card-header">
      <h4 className="card-header--title">{title}</h4>
    </header>
  )
}

const MovieCardBody = ({ overview, release_date }) => {
  return (
    <div className="card-body">
      <p className="date">Released: { release_date }</p>
      
      <p className="body-content">{ overview }</p>
      <button className="button button-primary">
        <i className="fa fa-chevron-right"></i> Find out more
      </button>
    </div>
  )
}

