import React, { useState } from 'react';

function AdminPanel({ products, setProducts }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: '', price: 0, image: '' });

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8080/products/${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProducts(products.filter((product) => product.id !== productId));
      } else {
        alert('Failed to delete the product.');
      }
    } catch (error) {
      alert('An error occurred while deleting the product.');
    }
  };

  const updateProduct = async () => {
    try {
      const response = await fetch(`http://localhost:8080/products/${currentProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentProduct),
      });
      if (response.ok) {
        setProducts(
          products.map((product) =>
            product.id === currentProduct.id ? currentProduct : product
          )
        );
        setIsEditing(false);
        setCurrentProduct(null);
      } else {
        alert('Failed to update the product.');
      }
    } catch (error) {
      alert('An error occurred while updating the product.');
    }
  };

  const addProduct = async () => {
    try {
      const response = await fetch('http://localhost:8080/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      if (response.ok) {
        const newProductData = await response.json();
        setProducts([...products, newProductData]);
        setNewProduct({ name: '', price: 0, image: '' });
      } else {
        alert('Failed to add the product.');
      }
    } catch (error) {
      alert('An error occurred while adding the product.');
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <button onClick={() => setIsEditing(true)}>Add New Product</button>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <p className="product-name">{product.name}</p>
              <p className="product-price">{product.price}</p>
              <div className="admin-buttons">
                <button onClick={() => { setIsEditing(true); setCurrentProduct(product); }}>Edit</button>
                <button onClick={() => deleteProduct(product.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {(isEditing || currentProduct) && (
        <div className="product-form">
          <h2>{currentProduct ? 'Edit Product' : 'Add New Product'}</h2>
          <input
            type="text"
            placeholder="Product Name"
            value={isEditing ? currentProduct.name : newProduct.name}
            onChange={(e) =>
              isEditing
                ? setCurrentProduct({ ...currentProduct, name: e.target.value })
                : setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Price"
            value={isEditing ? currentProduct.price : newProduct.price}
            onChange={(e) =>
              isEditing
                ? setCurrentProduct({ ...currentProduct, price: e.target.value })
                : setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Image URL"
            value={isEditing ? currentProduct.image : newProduct.image}
            onChange={(e) =>
              isEditing
                ? setCurrentProduct({ ...currentProduct, image: e.target.value })
                : setNewProduct({ ...newProduct, image: e.target.value })
            }
          />
          <button onClick={isEditing ? updateProduct : addProduct}>
            {isEditing ? 'Update Product' : 'Add Product'}
          </button>
          <button onClick={() => { setIsEditing(false); setCurrentProduct(null); }}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
