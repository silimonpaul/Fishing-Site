import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ cartItems }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          🎣 Fishing Paradise
        </Link>
        <Link to="/cart" className="navbar-cart">
          🛒 Cart ({cartItems.length})
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;