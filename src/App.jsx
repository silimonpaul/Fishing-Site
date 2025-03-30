import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import './styles/styles.css';
import TimeDisplay from './components/TimeDisplay';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  const addToCart = (product) => {
    // Add unique identifier for each cart item
    const cartItem = {
      ...product,
      cartId: `${product.id}-${Date.now()}`  // Add unique cartId
    };
    setCartItems([...cartItems, cartItem]);
  };

  const removeFromCart = (cartId) => {
    setCartItems(cartItems.filter(item => item.cartId !== cartId));
  };

  return (
    <Router>
      <div className={`container ${!isMenuVisible ? 'hidden' : ''}`}>
        <TimeDisplay />
        <Navbar cartItems={cartItems} />
        <Routes>
          <Route path="/" element={<ProductList addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
        </Routes>
      </div>
      <button 
        className="toggle-menu-button"
        onClick={() => setIsMenuVisible(!isMenuVisible)}
      >
        {isMenuVisible ? '👁️' : '👁️'}
      </button>
    </Router>
  );
}

export default App;