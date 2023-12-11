import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./MovieList.css";

function MovieList() {
  const history = useHistory();
  const dispatch = useDispatch();

  // Grab list of movies from redux
  const movies = useSelector((store) => store.movies);

  useEffect(() => {
    dispatch({ type: "FETCH_MOVIES" });
  }, []);

  // Take the id of the clicked movie and store it in redux,
  //  then navigate to the details page
  const handleClick = (id) => {
    dispatch({
      type: "SET_MOVIE_ID",
      payload: id,
    });

    history.push("/details");
  };

  return (
    <main>
      <h1>Movie List</h1>
      <section className="movies">
        {movies.map((movie) => {
          return (
            <div className='movieItem' data-testid="movieItem" key={movie.id}>
              <h3>{movie.title}</h3>
              <img
                onClick={() => handleClick(movie.id)}
                data-testid="toDetails"
                src={movie.poster}
                alt={movie.title}
              />
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default MovieList;
