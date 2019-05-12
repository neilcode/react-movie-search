import React from 'react';
import { Row, Col }from 'react-grid-system';
import './singleMovieCard.css'
import lodash from 'lodash'

const SingleMovieCard = ({
  collapseCard, 
  visibility, 
  title,
  tagline,
  genres,
  budget,
  revenue,
  runtime,
  poster_path,
  backdrop_path,
  overview,
  release_date,
  imdb_id
}) => {

  const dollarParser  = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  const posterImg = backdrop_path ? 'url(https://image.tmdb.org/t/p/original/'+backdrop_path+')' : null;

  const posterStyle = {
    backgroundImage: posterImg,
  };
  if (visibility) {
    return (
      <Row  >
        <Col>
          <div className='single-card' >
            <div style={posterStyle} className='single-card-header'/>
            <div className='single-card-body'>
              <h4 className='single-card-body--title'>{title} - {tagline}</h4>
              <ul className='single-card-body-content'>
                { genres  && <li>Genre: {lodash.map(genres, 'name').join(', ')}</li> }
                <li>Budget: {dollarParser.format(budget)}</li>
                <li>Revenue: {dollarParser.format(revenue)}</li>
                { runtime && <li>Runtime: {runtime} minutes</li> }
                { imdb_id && 
                  <li>
                    <a target='_blank' 
                      rel='noreferrer noopener' 
                      href={`http://www.imdb.com/title/${imdb_id}`}
                    >
                      IMDb Page
                    </a>
                  </li> 
                }
              </ul>
              <div onClick={() => {collapseCard()}} className='single-card-body-content' >
                {overview}
                <button className='single-card-button-primary'>Go Back</button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    )
  } else {
    return <div/>
  }
}

export default SingleMovieCard;
