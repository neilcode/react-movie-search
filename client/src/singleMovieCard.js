import React from 'react';
import './singleMovieCard.css'

const SingleMovieCard = ({ visibility, movie }) => {
  if (visibility) {
    console.log('revealing result');
    return (<div>yay</div>)
  } else {
    return <div/>
  };
}

export default SingleMovieCard;
