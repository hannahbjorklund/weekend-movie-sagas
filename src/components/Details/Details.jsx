import { useHistory } from 'react-router-dom';

export default function Details(){
    const history = useHistory();

    const navigateToHome = () => {
        history.push('/');
    }

    


    return (
        <div data-testid='movieDetails'>
            <button onClick={navigateToHome} data-testid='toList'>Back to Movie List ←</button>
            {/* Should show :
            - Poster
            - Title
            - Description
            - Genres
            For the clicked movie
             */}
        </div>
    )
}