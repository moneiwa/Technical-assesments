import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function Home() {

  return (
    <div className="home-container">
      <div className="home">
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
            <img src="one.jpg" alt="Kitchen" loading="lazy" />
            <p>Kitchen</p>
          </div>
          <div className="category">
            <img src="two.jpg" alt="Bedroom" loading="lazy" />
            <p>Bedroom</p>
          </div>
          <div className="category">
            <img src="three.jpg" alt="Bathroom" loading="lazy" />
            <p>Bathroom</p>
          </div>
          <div className="category">
            <img src="four.jpg" alt="Decor" loading="lazy" />
            <p>Decor</p>
          </div>
        </section>

        <section className="product">
          <img src="five.jpg" alt="Cream Dispenser" loading="lazy" />  </section>
          <div className="product-info">
            <span className="price">R150</span>
            <p>Cream Dispenser</p>
            <Link to="/shop">
              <button className="view-button">View more</button>
            </Link>
          </div>
      

        <section className="product">
          <img src="one.jpg" alt="Bedding" loading="lazy" /> </section>
          <div className="product-info">
            <span className="price">R750</span>
            <p>Storage jar</p>
            <Link to="/shop">
              <button className="view-button">View more</button>
            </Link>
          </div>
       
      </div>
    </div>
  );
}

export default Home;
