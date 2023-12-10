import { useEffect } from 'react';
import './AddMovie.css';
import { useSelector, useDispatch } from 'react-redux';

export default function AddMovie(){

    const dispatch = useDispatch();
    // Get the genres reducer
    const genres = useSelector(store => store.genres);
    useEffect(() => {getGenres();}, []);

    const getGenres = () => {
        dispatch({
            type: 'GET_GENRES'
        })
    }

    console.log("Got some genres:", genres);

    return (
        <>
        <h1>Add a Movie</h1>
        <div className = 'container'>
            <form>
                <input
                    placeholder='Title'
                />
                <input
                    placeholder='Poster Image URL'
                />
                <input
                    placeholder='Description'
                    className='description'
                />
                <label>Genre:</label>
                <select>
                    <option>Adventure</option>
                    <option>Animated</option>
                    <option>Biographical</option>
                    <option>Comedy</option>
                    <option>Disaster</option>
                    <option>Drama</option>
                    <option>Epic</option>
                    <option>Fantasy</option>
                    <option>Musical</option>
                    <option>Romantic</option>
                    <option>Science-Fiction</option>
                    <option>Space-Opera</option>
                    <option>Superhero</option>
                </select>
            </form>
        </div>
        <button>Save</button>
        <button>Cancel</button>
        </>
    )
}