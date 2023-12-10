import "./Header.css";
import { HashRouter as Router, Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <h1 className="title">The Movies Saga!</h1>
      <p className="nav">
        <Router>
          <Link to="/">Home</Link>/<Link to="/addMovie">Add a Movie</Link>
        </Router>
      </p>
    </header>
  );
}
