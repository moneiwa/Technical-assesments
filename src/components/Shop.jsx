import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import "./index.css";
import Paypal from './Paypal';

function Shop() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("kitchen"); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [cart, setCart] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); 
      setError(null); 
      try {
        const response = await fetch(
          `http://localhost:8080/categories/${selectedCategory}/products`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(item => item.id === product.id);
      if (existingProductIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="app">
      <header className="navbar">
        <div className="menu-icon">☰</div>
        <h1 className="title">Home-essentials</h1>
        <nav className="nav-links">
          <Link to="/">HOME</Link> 
          <Link to="/shop">SHOP</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/auth"> 
            <button className="shop-button">Logout</button>
          </Link>
        </nav>

      
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </header>

      <div className="category-buttons">
        {['kitchen', 'bedroom', 'bathroom', 'decor'].map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            disabled={selectedCategory === category}
            className={selectedCategory === category ? 'active' : ''}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {loading && <div className="loading">Loading products...</div>}
      {error && <div className="error">{error}</div>}

      <main className="product-grid">
        {filteredProducts.length === 0 && !loading && !error ? (
          <div className="no-products">No products available in this category.</div>
        ) : (
          filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <p className="product-name">{product.name}</p>
                <p className="product-price">{formatPrice(product.price)}</p>
                <button className="cart-button" onClick={() => addToCart(product)}>
                  + Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </main>

      
      <div className="cart">
        <h2>Your Shopping Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <p>{item.name}</p>
                  <p>{formatPrice(item.price)}</p>
                  <div>
                    <label>Quantity: </label>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    />
                  </div>
                  <button className="remove-from-cart" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="paypal-section">
              <p>Total: {formatPrice(getTotalPrice())}</p>
              <Paypal total={getTotalPrice()} cart={cart} setCart={setCart} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Shop;
