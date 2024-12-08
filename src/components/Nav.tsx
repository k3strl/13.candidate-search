import { Link } from "react-router-dom";

// DONE: Add necessary code to display the navigation bar and link between the pages
// TODO: Style this page (here or in index.css #decideLater)



const Nav = () => {
  return (
    <nav>
      <ul>      
        {/* <ul style={{ display: "flex,", gap: "1rem", listStyle: "none"}}> */}
      <li>
        <Link to= "/">Home</Link>
      </li>
        <li>
          <Link to= "/">
            Potential Candidates
          </Link>
        </li>
      </ul>
    </nav>
  )
};

export default Nav;
