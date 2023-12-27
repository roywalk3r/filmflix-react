import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const [isNavVisible, setNavVisibility] = useState(false);
  const location = useLocation();

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  // Check if the current route is not the landing page ("/"), then show the navbar
  const showNavbar = location.pathname !== "/";

  return (
    // Conditionally render the Navbar based on the showNavbar variable
    showNavbar && (
      <header>
        <div className={`header-container nav ${isNavVisible ? "show" : ""}`}>
          <i className="fas fa-bars menu" id="menu" onClick={toggleNav}></i>
          <NavLink to="/home" className="logo">
            Film<span>Flix</span>
          </NavLink>
          <nav className={`navbar ${isNavVisible ? "show" : ""}`}>
            <ul className="navlinks">
              <li>
                <NavLink to="/browse">Browse</NavLink>
              </li>
              <li>
                <NavLink to="/movies/">Movies</NavLink>
              </li>
              <li>
                <NavLink to="/tv_shows">TV Shows</NavLink>
              </li>
              <li>
                <NavLink to="/kids">Kids</NavLink>
              </li>
            </ul>
          </nav>
          <div className="search-box">
            <input type="search" id="search-input" placeholder="Search movie" />
            <i className="bx bx-search" id="search-icon"></i>
          </div>
          <input type="submit" className="signin" value="sign in" />
        </div>
      </header>
    )
  );
}

export default Navbar;
