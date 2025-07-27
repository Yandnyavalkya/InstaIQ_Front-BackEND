import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { isLoggedIn, getCurrentUser, logout, isAdmin } from "../utils/auth"; // Import auth utilities

// Header component with template navbar styling
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [userName, setUserName] = useState(""); // State to store user's name
  const navigate = useNavigate(); // Hook for navigation

  // Effect to check login status
  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = isLoggedIn();
      setIsLoggedIn(loggedIn);
      
      if (loggedIn) {
        const user = getCurrentUser();
        setUserName(user?.name || user?.email || '');
      } else {
        setUserName("");
      }
    };

    // Initial check
    checkLoginStatus();

    // Listen for changes in localStorage
    window.addEventListener('storage', checkLoginStatus);

    // Cleanup listener
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  // Handle user logout
  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header rs-nav header-transparent">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="row d-flex justify-content-between">
            <div className="topbar-left">
              <ul>
                <li><Link to="/faq"><i className="fa fa-question-circle"></i>Ask a Question</Link></li>
                <li><a href="mailto:support@website.com"><i className="fa fa-envelope-o"></i>Support@website.com</a></li>
              </ul>
            </div>
            <div className="topbar-right">
              <ul>
                <li>
                  <select className="header-lang-bx">
                    <option data-icon="flag flag-uk">English UK</option>
                    <option data-icon="flag flag-us">English US</option>
                  </select>
                </li>
                {isLoggedIn ? (
                  <>
                    <li><Link to="/profile">Hi, {userName}</Link></li>
                    {isAdmin() && <li><Link to="/admin">Admin Panel</Link></li>}
                    <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
                  </>
                ) : (
                  <>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Main Navbar */}
      <div className="sticky-header navbar-expand-lg">
        <div className="menu-bar clearfix">
          <div className="container clearfix">
            {/* Header Logo */}
            <div className="menu-logo">
              <Link to="/"><img src="assets/images/logo-white.png" alt="Logo" /></Link>
            </div>
            {/* Mobile Nav Button (not functional yet) */}
            <button className="navbar-toggler collapsed menuicon justify-content-end" type="button">
              <span></span>
              <span></span>
              <span></span>
            </button>
            {/* Social Icons and Search */}
            <div className="secondary-menu">
              <div className="secondary-inner">
                <ul>
                  <li className="search-btn"><button id="quik-search-btn" type="button" className="btn-link"><i className="fa fa-search"></i></button></li>
                </ul>
              </div>
            </div>
            {/* Search Box (static for now) */}
            <div className="nav-search-bar">
              <form action="#">
                <input name="search" type="text" className="form-control" placeholder="Type to search" />
                <span><i className="ti-search"></i></span>
              </form>
              <span id="search-remove"><i className="ti-close"></i></span>
            </div>
            {/* Navigation Menu */}
            <nav className="menu-links navbar-collapse collapse justify-content-start" id="menuDropdown">
              <ul className="nav navbar-nav">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/courses">Courses</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                {/* Removed direct Login/Register links here as they are handled in Top Bar */}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
