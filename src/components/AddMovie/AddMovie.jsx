export default function AddMovie(){
    return (
        <form>
            <input
                placeholder='Title'
            />
            <input
                placeholder='Poster Image URL'
            />
            <input
                placeholder='Description'
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
            <button>Cancel</button>
            <button>Save</button>
        </form>
    )
}