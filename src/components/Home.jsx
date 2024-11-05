import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <button className="menu-button" onClick={toggleMenu}>&#9776;</button>
        <h1 className="logo">Home-essentials</h1>
        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/Auth">Login</Link>
          <Link to="/admin">Admin</Link>
          <button className="shop-button">Logout</button>
        </div>
      </nav>

      <section className="banner">
        <div className="banner-content">
          <h1>Get up to 50% Off</h1>
          <span className="lack">Black Friday Special</span>
          <Link to="/shop">
            <button className="shop-button">Shop now</button>
          </Link>
        </div>
      </section>

      <section className="categories">
        <div className="category">
          <img 
            srcSet="one.jpg 600w, one.jpg 1024w, one.jpg 1600w"
            sizes="(max-width: 600px) 600px, (max-width: 1024px) 1024px, 1600px" 
            src="one-large.jpg" 
            alt="Kitchen" 
            loading="lazy" 
          />
          <p>Kitchen</p>
        </div>
        <div className="category">
          <img 
            srcSet="two.jpg 600w, two-medium.jpg 1024w, two.jpg 1600w" 
            sizes="(max-width: 600px) 600px, (max-width: 1024px) 1024px, 1600px" 
            src="two-large.jpg" 
            alt="Bedroom" 
            loading="lazy" 
          />
          <p>Bedroom</p>
        </div>
        <div className="category">
          <img 
            srcSet="three.jpg 600w, three-medium.jpg 1024w, three.jpg 1600w" 
            sizes="(max-width: 600px) 600px, (max-width: 1024px) 1024px, 1600px" 
            src="three-large.jpg" 
            alt="Bathroom" 
            loading="lazy" 
          />
          <p>Bathroom</p>
        </div>
        <div className="category">
          <img 
            srcSet="four.jpg 600w, four.jpg 1024w, four.jpg 1600w" 
            sizes="(max-width: 600px) 600px, (max-width: 1024px) 1024px, 1600px" 
            src="four-large.jpg" 
            alt="Decor" 
            loading="lazy" 
          />
          <p>Decor</p>
        </div>
      </section>

      <section className="products">
        <div className="product">
          <img src="five.jpg" alt="Cream Dispenser" />
          <div className="product-info">
            <span className="price">R150</span>
            <p>Cream Dispenser</p>
            <Link to="/shop">
              <button className="view-button">View more</button>
            </Link>
          </div>
        </div>

        <div className="product">
          <img src="six.webp" alt="Bedding" />
          <div className="product-info">
            <span className="price">R750</span>
            <p>Bedding</p>
            <Link to="/shop">
              <button className="view-button">View more</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
