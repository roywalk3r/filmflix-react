import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const [isNavVisible, setNavVisibility] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close the navbar if the click is outside the navbar and it is currently visible
      if (
        isNavVisible &&
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setNavVisibility(false);
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isNavVisible]);

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  // Check if the current route is not the landing page ("/"), then show the navbar
  const showNavbar = location.pathname !== "/";

  return (
    // Conditionally render the Navbar based on the showNavbar variable
    showNavbar && (
      <header>
        <div
          className={`header-container nav ${isNavVisible ? "show" : ""}`}
          ref={navRef}
        >
          <i className="fas fa-bars menu" id="menu" onClick={toggleNav}></i>
          <Link to="/home" className="logo">
            Film<span>Flix</span>
          </Link>
          <nav className={`navbar ${isNavVisible ? "show" : ""}`}>
            <ul className="navlinks">
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/movies/">Movies</Link>
              </li>
              <li>
                <Link to="/tv_shows">TV Shows</Link>
              </li>
              <li>
                <Link to="/kids">Kids</Link>
              </li>
            </ul>
          </nav>
          <div className="search-box">
            <Link to={"/search"}>
              <i className="bx bx-search" id="search-icon"></i>
            </Link>
          </div>
          <input type="submit" className="signin" value="sign in" />
        </div>
      </header>
    )
  );
}

export default Navbar;
