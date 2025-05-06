import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import './styles/main.css';  // Replace the old styles.css import
import TimeDisplay from './components/TimeDisplay';
import Footer from './components/Footer';

function App() {
  // Initialize cart items from localStorage or empty array if nothing stored
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const cartItem = {
      ...product,
      cartId: `${product.id}-${Date.now()}`
    };
    setCartItems([...cartItems, cartItem]);
  };

  const removeFromCart = (cartId) => {
    const itemToRemove = cartItems.find(item => item.cartId === cartId);
    const itemsWithSameId = cartItems.filter(item => item.id === itemToRemove.id);
    
    if (itemsWithSameId.length > 1) {
      // Remove only the first occurrence of the item
      const firstOccurrence = itemsWithSameId[0].cartId;
      setCartItems(cartItems.filter(item => item.cartId !== firstOccurrence));
    } else {
      // Remove the single item
      setCartItems(cartItems.filter(item => item.cartId !== cartId));
    }
  };

  return (
    <Router>
      <div className={`container ${!isMenuVisible ? 'hidden' : ''}`}>
        <TimeDisplay />
        <Navbar cartItems={cartItems} />
        <Routes>
          <Route path="/" element={<ProductList addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
          <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
        </Routes>
        <Footer />
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