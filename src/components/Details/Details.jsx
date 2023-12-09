import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Details() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    getMovie();
  }, []);

  // Get the movieID and movie from redux
  const movieID = useSelector((store) => store.movieID);
  const movie = useSelector((store) => store.movie);

  // Navigate the user to the MovieList page on button click
  const navigateToHome = () => {
    history.push("/");
  };

  // Dispatch to getMovies in sagas
  const getMovie = () => {
    dispatch({
      type: "GET_MOVIE",
      payload: movieID,
    });
  };

  return (
    <div data-testid="movieDetails">
      <button onClick={navigateToHome} data-testid="toList">
        Back to Movie List ←
      </button>

      <div>
        <img src={movie.poster} />
        <h1>{movie.title}</h1>
        <p>{movie.description}</p>
      </div>
    </div>
  );
}
