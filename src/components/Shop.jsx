import React, { useEffect, useState } from "react";
import axios from "axios";  
import Paypal from './Paypal';

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("kitchen"); 
  const [searchQuery, setSearchQuery] = useState("");  
  const [cart, setCart] = useState([]);  
  const [totalAmount, setTotalAmount] = useState(0);  

 
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/categories/${category}/products`);
      setProducts(response.data);
    } catch (error) {
      setError("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchProducts();
  }, [category]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

 
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product) => {
    setCart((prevCart) => {
     
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
       
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
     
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const cancelPaypalTransaction = () => {
    setCart([]);
  };

  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalAmount(total);
  }, [cart]);

  return (
    <div className="app">
      <header className="navbar">
        <nav className="nav-links">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </nav>
      </header>

      <div className="category-buttons">
        {['kitchen', 'bedroom', 'bathroom', 'decor'].map((categoryType) => (
          <button
            key={categoryType}
            onClick={() => setCategory(categoryType)}
            disabled={category === categoryType}
            className={category === categoryType ? "active" : ""}
          >
            {categoryType.charAt(0).toUpperCase() + categoryType.slice(1)}
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
        {cart.length > 0 ? (
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <p>{item.name} x{item.quantity}</p>
                  <p>{formatPrice(item.price * item.quantity)}</p>
                </div>
                <button className="remove-button" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No items in cart</p>
        )}

      
        <div className="cart-total">
          <h3>Total: {formatPrice(totalAmount)}</h3>
        </div>

     
        {totalAmount > 0 && (
          <Paypal totalAmount={totalAmount} cart={cart} cancelTransaction={cancelPaypalTransaction} />
        )}
      </div>
    </div>
  );
}

export default Shop;
