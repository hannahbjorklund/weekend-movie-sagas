import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css'

function MovieList() {

  const dispatch = useDispatch();
  const movies = useSelector(store => store.movies);
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
  }, []);

  const handleClick = (id) => {
    // Take the id of the movie and store it in redux
    dispatch({
      type: 'SET_MOVIE_ID',
      payload: id
    })
    
    history.push('/details');
  }

  

  return (
    <main>
      <h1>MovieList</h1>
      <section className="movies">
        {movies.map(movie => {
          return (
            <div data-testid='movieItem' key={movie.id}>
              <h3>{movie.title}</h3>
              <img onClick={() => handleClick(movie.id)} data-testid='toDetails' src={movie.poster} alt={movie.title}/>
            </div>
          );
        })}
      </section>
    </main>

  );
}


export default MovieList;
