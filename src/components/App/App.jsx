import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import MovieList from "../MovieList/MovieList";
import Details from "../Details/Details";
import AddMovie from "../AddMovie/AddMovie";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Route path="/" exact>
          <MovieList />
        </Route>
        <Route exact path="/details">
          <Details />
        </Route>
        <Route exact path="/addMovie">
          <AddMovie />
        </Route>
      </Router>
    </div>
  );
}

export default App;
