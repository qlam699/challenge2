import React, { useMemo, useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Movies from './Movies';
import { OPTIONS } from './constants';

const NUMBER_OF_PAGING = 2;

const getMovies = currentPage => gql`{
    nowPlaying(page: ${currentPage}) {
        movies {
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
        count
        total
        page
        totalPage
      }
  }
  `

const Paging = props => {
    const { currentPage, setCurrentPage, listPage } = props;
    const pages = Array.from({ length: listPage }, (v, k) => k + 1);

    const paging = useMemo(() => pages.map((pos) => {
        if (pos === 1 || pos === pages.length || (pos > currentPage - NUMBER_OF_PAGING && pos < currentPage + NUMBER_OF_PAGING)) {
            return (
                <li key={pos}>
                    <a href='/#' onClick={() => setCurrentPage(pos)} className={currentPage === pos ? 'active' : ''}>{pos}</a>
                </li>
            )
        } else if (pos === currentPage - NUMBER_OF_PAGING - 1 || pos === currentPage + NUMBER_OF_PAGING + 1) {
            return (<li key={pos}>
                &#183;&#183;&#183;
            </li>)
        }
        return (
            <li key={pos}></li>
        )
    }), [pages, setCurrentPage, currentPage]);

    return (
        <ul className='pagination'>
            <li><a href='/#' onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}>«</a></li>
            {paging}
            <li><a href='/#' onClick={() => currentPage < pages.length && setCurrentPage(currentPage + 1)}>»</a></li>
        </ul>
    )
}
const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [listMovie, setListMovie] = useState([]);
    const [listView, setListView] = useState([]);
    const { data, loading, error } = useQuery(getMovies(currentPage), [currentPage]);
    const totalPage = data?.nowPlaying?.totalPage;

    useEffect(() => {
        if (data) {
            setListMovie(data?.nowPlaying?.movies);
            setListView(data?.nowPlaying?.movies);
        }
    }, [data]);

    const handleChangeFilter = e => {
        switch (e.target.value) {
            case OPTIONS.ADULT:
                setListView(listMovie.filter(m => m.adult))
                break;
            case OPTIONS.RATING:
                setListView(listMovie.filter(m => m.vote_average > 5));
                break;
            case OPTIONS.POPULAR:
                setListView(listMovie.filter(m => m.popularity > 80));
                break;
            default:
                setListView(listMovie);
                break;
        }
    }

    return (
        <div>
            <h1 className='title'>Now Playing Movies</h1>
            <hr className='line-space' />
            <label><b>Filter: </b></label>
            <select className='select' onChange={handleChangeFilter} name='movie_filter'>
                <option defaultChecked>All</option>
                <option value={OPTIONS.ADULT}>Adult</option>
                <option value={OPTIONS.RATING}>Rating</option>
                <option value={OPTIONS.POPULAR}>Popular</option>
            </select>
            <Movies loading={loading} error={error} data={listView} />
            <hr className='line-space' />
            <Paging currentPage={currentPage} setCurrentPage={setCurrentPage} listPage={totalPage} />
        </div>
    )
}

export default Home;
