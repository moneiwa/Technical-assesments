import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const [menuOpen, setMenuOpen] = useState(false); 

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); 
  };

  return (
    <nav className="navbar">
      <button className="menu-button" onClick={toggleMenu}>&#9776;</button> 
      <h1 className="logo">Home-essentials</h1>
      <div className={`nav-links ${menuOpen ? 'active' : ''}`}> 




        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        {isLoggedIn ? (
          <>
            <Link to="/profile">Profile</Link>
            <button className="shop-button" onClick={() => setIsLoggedIn(false)}>Logout</button>
          </>
        ) : (
          <Link to="/auth">Login</Link>
        )}
        <Link to="/admin">Admin</Link>


        <Link to="/auth">
            <button className="shop-button">Logout</button>
          </Link>
      </div>
    </nav>
  );
}

export default Navbar;
