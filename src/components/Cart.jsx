import React from 'react';
import { useNavigate } from 'react-router-dom';

function Cart({ cartItems, removeFromCart }) {
  const navigate = useNavigate();
  
  // Group items by product ID and calculate quantities
  const groupedItems = cartItems.reduce((acc, item) => {
    const productId = item.id;
    if (!acc[productId]) {
      acc[productId] = {
        ...item,
        quantity: 1,
        totalPrice: item.price
      };
    } else {
      acc[productId].quantity += 1;
      acc[productId].totalPrice = acc[productId].quantity * item.price;
    }
    return acc;
  }, {});

  const total = Object.values(groupedItems).reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="cart-container">
      <h1 className="page-title">Your Fishing Cart</h1>

      {cartItems.length === 0 ? (
        <div className="card">
          <h2 className="page-title">Your cart is empty</h2>
          <p className="product-description">Time to catch some great deals! 🎣</p>
        </div>
      ) : (
        <>
          <div>
            {Object.values(groupedItems).map(item => (
              <div key={item.id} className="card cart-item">
                <div className="product-image-container cart-image">
                  <img 
                    src={item.image || 'https://placehold.co/200x150?text=No+Image'} 
                    alt={item.name}
                    className="product-image"
                    style={{ width: '30rem', height: 'auto' }}
                  />
                </div>
                <div className="cart-item-details">
                  <h3 className="page-title">{item.name}</h3>
                  <p className="product-quantity">Quantity: {item.quantity}</p>
                  <p className="product-price">${item.totalPrice.toFixed(2)}</p>
                </div>
                <button 
                  className="remove-button"
                  onClick={() => removeFromCart(item.cartId)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="card cart-total">
            <h2>Total: ${total.toFixed(2)}</h2>
            <button 
              className="button checkout-button"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;