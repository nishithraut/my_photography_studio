import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null); // reference to nav-options

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false); // close if clicked outside menu
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <nav className="custom-navbar">
      {/* Left: Hamburger (mobile only) */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <i className="fa-solid fa-bars"></i>
      </div>

      {/* Center: Logo */}
      <div className="logo">
        <NavLink to="/home">
          <img className="logo-img" src="media/logo.png" alt="Logo" />
        </NavLink>
      </div>

      {/* Right: User login */}
      <div className="nav-icon">
        <Link to="/login">
          <i className="fa-regular fa-circle-user"></i>
        </Link>
      </div>

      {/* Slide menu options (for mobile) */}
      <div ref={menuRef} className={`nav-options ${menuOpen ? "open" : ""}`}>
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setMenuOpen(false)}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setMenuOpen(false)}
        >
          About
        </NavLink>
        <NavLink
          to="/gallery"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setMenuOpen(false)}
        >
          Gallery
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
