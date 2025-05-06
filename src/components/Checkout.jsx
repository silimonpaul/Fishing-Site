import React from 'react';
import { useNavigate } from 'react-router-dom';

function Checkout({ cartItems }) {
  const navigate = useNavigate();
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle payment processing
    alert('Order placed successfully!');
    navigate('/');
  };

  return (
    <div className="checkout-container">
      <h1 className="page-title">Checkout</h1>
      <div className="checkout-summary">
        <h2>Order Summary</h2>
        <div className="checkout-items">
          {cartItems.map(item => (
            <div key={item.cartId} className="checkout-item">
              <span>{item.name}</span>
              <span>${item.price}</span>
            </div>
          ))}
        </div>
        <div className="checkout-total">
          <strong>Total: ${total.toFixed(2)}</strong>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="checkout-form">
        <h2>Shipping Information</h2>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input 
            type="text" 
            id="name" 
            pattern="[A-Za-z\s]+"
            onKeyPress={(e) => {
              if (!/[A-Za-z\s]/.test(e.key)) {
                e.preventDefault();
              }
            }}
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input 
            type="tel" 
            id="phone" 
            pattern="[0-9]*"
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address & Email</label>
          <textarea id="address" required></textarea>
        </div>
        <button type="submit" className="button checkout-submit">
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;