import React, { useContext } from "react";
import { myContext } from "../App";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  let appState = useContext(myContext);
  let navigate = useNavigate();

  const total = appState.cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-page">
      <h2 className="cart-title">🛒 Your Cart</h2>
      {appState.cart.length > 0 ? (
        <>
          <div className="cart-grid">
            {appState.cart.map((e) => (
              <div className="cart-card" key={e.id}>
                <img src={e.image} alt={e.title} />
                <h3 className="cart-item-title">{e.title}</h3>
                <p className="cart-item-price">${e.price.toFixed(2)}</p>
                <p className="cart-item-rating">⭐ {e.rating.rate}</p>
                <button
                  className="btn-remove"
                  onDoubleClick={() => {
                    let filtered = appState.cart.filter((x) => x.id !== e.id);
                    appState.Dispatch({ type: "remove", payload: filtered });
                  }}
                >
                  🗑 Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-summary-inner">
              <h3>Order Summary</h3>
              <ul>
                {appState.cart.map((e) => (
                  <li key={e.id}>
                    <span>{e.title.slice(0, 30)}...</span>
                    <span>${e.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="cart-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                className="btn-checkout"
                onClick={() => navigate("../checkout")}
              >
                Proceed to Checkout →
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="cart-empty">
          <span>🛍️</span>
          <h1>Your cart is empty</h1>
          <button className="btn-shop" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
