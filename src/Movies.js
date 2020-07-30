import React from 'react';
import './App.css';
import { useHistory } from 'react-router-dom';
import noImage from './assets/no_image_available.jpg';
import Loader from './Loader';


const Movies = props => {
    const history = useHistory();
    if (props.loading) return <Loader/>;
    if (props.error) return <p>Error: Cannot load data.</p>;
    if(props.data.length === 0) return (
        <div className='container'><h1 className='center'>No data</h1></div>
    )

    return (
        <div className='list'>
            <div className='container'>
                {props.data.map(({id, title, poster_path, vote_average}) => (
                    <div key={id} className='item' onClick={()=> history.push(`/detail/${id}`) }>
                        <img alt='thumnail' onError={(e)=>{e.target.src=noImage}} className='thumnail' src={poster_path} />
                        <div className='description'>
                            <h2 className='name'>{title}</h2>
                            <p><b>Rating:</b> {vote_average} </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Movies;
