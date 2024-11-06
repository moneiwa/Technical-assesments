import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css'; // Make sure this CSS file has the necessary styles

function Navbar({ authToken, setAuthToken }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    setAuthToken(null); 
    localStorage.removeItem('authToken');
  };

  return (
    <nav className="navbar">
      <button className="menu-button" onClick={toggleMenu}>
        &#9776;
      </button>
      <h1 className="logo">Home-essentials</h1>
      <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>

        {/* Conditional rendering based on authToken */}
        {authToken ? (
          <>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/auth" className="login-button">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
