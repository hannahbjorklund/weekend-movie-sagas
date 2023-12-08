import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Details() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {getMovie()}, []);
  // Get the reducer
  const movieID = useSelector(store => store.movieID);
  console.log("movieID in Details:", movieID);

  const navigateToHome = () => {
    history.push("/");
  };

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
      {/* Should show :
            - Poster
            - Title
            - Description
            - Genres
            For the clicked movie
             */}
    </div>
  );
}
