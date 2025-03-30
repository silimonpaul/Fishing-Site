import React from 'react';

function Cart({ cartItems, removeFromCart }) {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

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
            {cartItems.map(item => (
              <div key={item.cartId} className="card cart-item">
                <div className="product-image-container cart-image">
                  <img 
                    src={item.image || 'https://placehold.co/200x150?text=No+Image'} 
                    alt={item.name}
                    className="product-image"
                  />
                </div>
                <div className="cart-item-details">
                  <h3 className="page-title">{item.name}</h3>
                  <p className="product-price">${item.price}</p>
                  <span className={`category-label ${item.category}`}>
                    {item.category === 'bait' ? 'Bait & Lures' : 'Equipment'}
                  </span>
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
              onClick={() => alert('Checkout functionality coming soon!')}
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