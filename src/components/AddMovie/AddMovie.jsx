import { useEffect } from "react";
import "./AddMovie.css";
import { useSelector, useDispatch } from "react-redux";

export default function AddMovie() {
  const dispatch = useDispatch();
  // Get the genres reducer
  const genres = useSelector((store) => store.genres);
  useEffect(() => {
    getGenres();
  }, []);

  // Shout into the void
  const getGenres = () => {
    dispatch({
      type: "GET_GENRES",
    });
  };

  return (
    <>
      <h1>Add a Movie</h1>
      <div className="container">
        <form>
          <input placeholder="Title" />
          <input placeholder="Poster Image URL" />
          <input placeholder="Description" className="description" />
          <label>Genre:</label>
          <select>
            {genres &&
              genres.map((x) => {
                return <option key={x.id}>{x.name}</option>;
              })}
          </select>
        </form>
      </div>
      <button>Save</button>
      <button>Cancel</button>
    </>
  );
}
