import { useEffect, useState } from "react";
import "./AddMovie.css";
import { useSelector, useDispatch } from "react-redux";

export default function AddMovie() {
  const dispatch = useDispatch();
  // Get the genres reducer
  const genres = useSelector((store) => store.genres);

  // Storing form inputs in local state
  const [titleInput, setTitleInput] = useState("");
  const [posterInput, setPosterInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [genreInput, setGenreInput] = useState(0);

  useEffect(() => {
    getGenres();
  }, []);

  const getGenres = () => {
    dispatch({
      type: "GET_GENRES",
    });
  };

  const addMovie = () => {
    // Bundle user input movie info into object and dispatch
    const newMovie = {
      title: titleInput,
      poster: posterInput,
      description: descInput,
      genre_id: genreInput,
    };
    dispatch({
      type: "ADD_MOVIE",
      payload: newMovie,
    });
  };

  return (
    <>
      <h1>Add a Movie</h1>
      <div className="container">
        <form onSubmit={addMovie}>
          <input
            placeholder="Title"
            value={titleInput}
            onChange={(e) => {
              setTitleInput(e.target.value);
            }}
          />
          <input
            placeholder="Poster Image URL"
            value={posterInput}
            onChange={(e) => {
              setPosterInput(e.target.value);
            }}
          />
          <textarea
            placeholder="Description"
            className="description"
            value={descInput}
            onChange={(e) => {
              setDescInput(e.target.value);
            }}
          />
          <label>Genre:</label>
          <select
            value={genreInput}
            onChange={(e) => setGenreInput(e.target.value)}
          >
            {genres &&
              genres.map((x) => {
                return (
                  <option key={x.id} value={x.id}>
                    {x.name}
                  </option>
                );
              })}
          </select>
          <button className="formButton" type="submit">
            Save
          </button>
          <button className="formButton" type="reset">
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}
