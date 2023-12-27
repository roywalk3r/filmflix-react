import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const [isNavVisible, setNavVisibility] = useState(false);

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  return (
    <>
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
                <NavLink to="/movies/">Movie</NavLink>
              </li>
              <li>
                <NavLink to="/tv_shows">TV Shows</NavLink>
              </li>
              <li>
                <NavLink to="/kid">Kids</NavLink>
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
    </>
  );
}

export default Navbar;
