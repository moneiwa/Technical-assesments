import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'; 
import { useNavigate } from 'react-router-dom'; 

function Admin() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('bedroom'); 
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    category: 'bedroom', 
  });
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');  // New state for search query

  const navigate = useNavigate(); 
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    if (!authToken) {
      navigate('/auth'); 
    }
  }, [authToken, navigate]);

  // Fetch categories and products
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/categories');
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          console.error('Categories response is not an array:', response.data);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories.');
      }
    };

    const fetchProducts = async () => {
      setLoading(true);
      setError(null); 
      try {
        const response = await axios.get(
          `http://localhost:8080/categories/${selectedCategory}/products`
        );
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error('Products response is not an array:', response.data);
          setError('Failed to load products.');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories(); 
    fetchProducts(); 
  }, [selectedCategory]);

  // Handle form submission for adding/editing products
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      handleEditProduct(editProductId, formData); 
    } else {
      handleAddProduct(formData); 
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: '', price: '', image: '', category: 'bedroom' });
    setEditMode(false);
    setEditProductId(null);
  };

  const handleAddProduct = (productData) => {
    axios
      .post(`http://localhost:8080/categories/${productData.category}/products`, productData)
      .then((response) => {
        setProducts([...products, response.data]); 
      })
      .catch((error) => {
        console.error('Error adding product:', error);
        setError('Failed to add product.');
      });
  };

  const handleEditProduct = (productId, updatedData) => {
    axios
      .put(`http://localhost:8080/categories/${updatedData.category}/products/${productId}`, updatedData)
      .then(() => {
        setProducts(
          products.map((product) =>
            product.id === productId ? { ...product, ...updatedData } : product
          )
        );
      })
      .catch((error) => {
        console.error('Error updating product:', error);
        setError('Failed to update product.');
      });
  };

  const handleDeleteProduct = (productId) => {
    axios
      .delete(`http://localhost:8080/categories/${selectedCategory}/products/${productId}`)
      .then(() => {
        setProducts(products.filter((product) => product.id !== productId));
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
        setError('Failed to delete product.');
      });
  };

  const handleEditProductClick = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category || selectedCategory,  
    });
    setEditMode(true);
    setEditProductId(product.id);
  };

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin">
      <h1>Admin Dashboard</h1>

      {/* Category buttons */}
      <div className="category-buttons">
        {categories.length > 0 ? (
          categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? 'active' : ''}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))
        ) : (
          <p>No categories available</p>
        )}
      </div>

      {/* Search input */}
      <div className="search-input">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading && <div className="loading">Loading products...</div>}
      {error && <div className="error">{error}</div>}

      {/* Product form */}
      <h3>{editMode ? 'Edit Product' : 'Add New Product'}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          required
        />
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
        <button type="submit">{editMode ? 'Update Product' : 'Add Product'}</button>
      </form>

      {/* Manage Products */}
      <h3>Manage Products</h3>
      {filteredProducts.length > 0 ? (
        <div className="product-list">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-item">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <p>{product.name}</p>
                <p>${product.price}</p>
                <button onClick={() => handleEditProductClick(product)}>Edit</button>
                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products match your search criteria.</p>
      )}
    </div>
  );
}

export default Admin;
