import React, { useState } from 'react';
import { products } from '../../data/products';
import ProductCard from './ProductCard';
import CategoryFilters from './CategoryFilters';

function ProductList({ addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="page-container">
      <h1 className="page-title">Fishing Gear, Bait & Lures</h1>
      <CategoryFilters 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <div className="grid-container">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;