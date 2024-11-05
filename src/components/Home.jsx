import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function Home() {
  return (
    <div className="home">
      <nav className="navbar">
        <button className="menu-button">&#9776;</button>
        <h1 className="logo">Home-essentials</h1>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>

          <Link to="/Auth">Login</Link>
          <Link to="/admin">admin</Link>
          <Link to="/Auth">
        <button className="shop-button">Logout</button>
      </Link>
        </div>
      </nav>

      <section className="banner">
        <div className="banner-content">
          <h1>Get up to 50% Off</h1>
          <span className='lack'>Black Friday Special</span>
          <Link to="/shop">
        <button className="shop-button">Shop now</button>
      </Link>
        </div>
       
      </section>

      <section className="categories">
        <div className="category">
          <img src="one.jpg" alt="Kitchen" />
          <p>Kitchen</p>
        </div>
        <div className="category">
          <img src="two.jpg" alt="Bedroom" />
          <p>Bedroom</p>
        </div>
        <div className="category">
          <img src="three.jpg" alt="Bathroom" />
          <p>Bathroom</p>
        </div>
        <div className="category">
          <img src="four.jpg" alt="Decor" />
          <p>Decor</p>
        </div>
      </section>

      <section className="product">
        <img src="five.jpg" alt="Cream Dispenser" /> </section>
        <div className="product-info">
          <span className="price">R150</span>
          <p>Cream Dispenser</p>


          <Link to="/shop">
          <button className="view-button">View more</button>
      </Link>

        </div>
     

      <section className="product">
        <img src="six.webp" alt="Bedding" />
        <div className="product-info">
          <span className="price">R750</span>
          <p>Bedding</p>
          <Link to="/shop">
          <button className="view-button">View more</button>
      </Link>


        </div>
      </section>
    </div>
  );
}

export default Home;
