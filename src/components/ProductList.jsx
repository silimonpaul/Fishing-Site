import React, { useState } from 'react';
import { products } from '../data/products';

function ProductList({ addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="product-container">
      <h1 className="page-title">Fishing Gear, Bait & Lures</h1>

      <div className="category-filters">
        <button 
          className={`button ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('all')}
        >
          All Products
        </button>
        <button 
          className={`button ${selectedCategory === 'equipment' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('equipment')}
        >
          Equipment
        </button>
        <button 
          className={`button ${selectedCategory === 'bait' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('bait')}
        >
          Bait & Lures
        </button>
      </div>

      <div className="product-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="card">
            <div className="product-image-container">
              <img 
                src={product.image || 'https://placehold.co/200x150?text=Add+Image'} 
                alt={product.name}
                className="product-image"
              />
            </div>
            <div>
              <h3 className="page-title">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <span className={`category-label ${product.category}`}>
                {product.category === 'bait' ? 'Bait & Lures' : 'Equipment'}
              </span>
            </div>
            <div>
              <p className="product-price">${product.price}</p>
              <button 
                className="button btn btn-primary" 
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;