// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Header({ resetLocalStorage }) {
  return (
    <header>
      <h1>LEARNING MANAGEMENT SYSTEM</h1><br/>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="true"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/" onClick={resetLocalStorage}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/AboutUs" onClick={resetLocalStorage}>About Us</Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/ContactUs" onClick={resetLocalStorage}>Contact Us</Link>
            </li> */}
            {/* <li className="nav-item">
              <Link to="/Blog" onClick={resetLocalStorage}>Blog</Link>
            </li> */}
            <li className="nav-item">
              <Link to="/services" onClick={resetLocalStorage}>Services</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" onClick={resetLocalStorage}>Login</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
