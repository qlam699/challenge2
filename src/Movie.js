import React from 'react';
import { useHistory } from 'react-router-dom';
import noImage from './assets/no_image_available.jpg';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Loader from './Loader';

const getMovies = id => gql`{
    details(movieId: ${id}) {
        id
        title
        original_title
        original_language
        overview
        video
        poster_path
        backdrop_path
        popularity
        adult
        vote_count
        vote_average
        release_date
      }
  }
  `
const MovieDetail = (props) => {
    const history = useHistory();
    const { data, loading, error } = useQuery(getMovies(props.match.params.id));

    if (loading) return <Loader />;
    if (error) return <p>Error: Cannot load data.</p>;

    const { title, overview, poster_path, backdrop_path,
        popularity, vote_count, vote_average, release_date } = data.details;

    return (
        <div className='detail' >
            <button className='btn btn-back' onClick={() => history.goBack()}>Back</button>
            <img onError={(e) => { e.target.src = noImage }} alt='thumnail_backdrop' className='thumnail_backdrop' src={backdrop_path} />
            <div className='description'>
                <img alt='thumnail' onError={(e) => { e.target.src = noImage }} className='thumnail' src={poster_path} />
                <div className='content'>
                    <h1 className='title'>{title}</h1>
                    <p>{overview}</p>
                    <p><b>Popular:</b> {popularity}</p>
                    <p><b>Rating:</b> {vote_average}</p>
                    <p><b>Vote count:</b> {vote_count}</p>
                    <p><b>Release date:</b> {release_date}</p>
                    <button className='btn btn-play'>Play</button>
                </div>
            </div>
        </div>
    )
}

export default MovieDetail;