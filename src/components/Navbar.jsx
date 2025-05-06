import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ cartItems }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span>🎣 Fishing Paradise</span>
        </Link>
        <Link to="/cart" className="navbar-cart">
          <span className="cart-emoji">🛒</span>
          <span>Cart ({cartItems.length})</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;