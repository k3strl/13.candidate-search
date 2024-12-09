import { Link } from "react-router-dom";

// DONE: Add necessary code to display the navigation bar and link between the pages

const Nav = () => {
  return (
    <nav>
      <ul style={{ display: "flex,", gap: "1rem", listStyle: "none"}}>      
      <li>
        <Link to="/">
          Home
        </Link>
      </li>
        <li>
          <Link to= "SavedCandidates">
            Saved Candidates
          </Link>
        </li>
      </ul>
    </nav>
  )
};

export default Nav;
