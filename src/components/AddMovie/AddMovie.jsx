import './AddMovie.css';

export default function AddMovie(){

    const [titleInput, setTitleInput]

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