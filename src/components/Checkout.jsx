import React, { useContext, useState } from "react";
import { myContext } from "../App";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  const appState = useContext(myContext);
  const navigate = useNavigate();

  const [method, setMethod] = useState("card");

  // Card fields
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // UPI field
  const [upiId, setUpiId] = useState("");

  const total = appState.cart.reduce((sum, item) => sum + item.price, 0);

  const formatCardNumber = (val) => {
    return val
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    appState.Dispatch({ type: "clearCart" });
    navigate("../order-success");
  };

  if (appState.cart.length === 0) {
    navigate("/");
    return null;
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* ── Left: Payment Form ── */}
        <div className="checkout-form-panel">
          <h2>💳 Secure Checkout</h2>

          {/* Payment Method Tabs */}
          <div className="payment-tabs">
            <button
              className={`tab-btn ${method === "card" ? "active" : ""}`}
              onClick={() => setMethod("card")}
              type="button"
            >
              💳 Card
            </button>
            <button
              className={`tab-btn ${method === "upi" ? "active" : ""}`}
              onClick={() => setMethod("upi")}
              type="button"
            >
              📱 UPI
            </button>
            <button
              className={`tab-btn ${method === "cod" ? "active" : ""}`}
              onClick={() => setMethod("cod")}
              type="button"
            >
              📦 Cash on Delivery
            </button>
          </div>

          <form onSubmit={handlePlaceOrder} className="payment-form">
            {/* ── Card Payment ── */}
            {method === "card" && (
              <div className="form-section fade-in">
                <div className="visual-card">
                  <div className="vc-chip">●●●</div>
                  <div className="vc-number">
                    {cardNumber || "●●●● ●●●● ●●●● ●●●●"}
                  </div>
                  <div className="vc-bottom">
                    <span>{cardName || "YOUR NAME"}</span>
                    <span>{expiry || "MM/YY"}</span>
                  </div>
                </div>

                <div className="form-group">
                  <label>Cardholder Name</label>
                  <input
                    id="card-name"
                    type="text"
                    placeholder="John Doe"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    id="card-number"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    required
                    value={cardNumber}
                    onChange={(e) =>
                      setCardNumber(formatCardNumber(e.target.value))
                    }
                    maxLength={19}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                      id="card-expiry"
                      type="text"
                      placeholder="MM/YY"
                      required
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      maxLength={5}
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      id="card-cvv"
                      type="password"
                      placeholder="•••"
                      required
                      value={cvv}
                      onChange={(e) =>
                        setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                      }
                      maxLength={4}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ── UPI Payment ── */}
            {method === "upi" && (
              <div className="form-section fade-in">
                <div className="upi-banner">
                  <span className="upi-logo">UPI</span>
                  <p>Pay instantly using any UPI app</p>
                </div>
                <div className="form-group">
                  <label>UPI ID</label>
                  <input
                    id="upi-id"
                    type="text"
                    placeholder="yourname@bank"
                    required
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </div>
                <p className="upi-hint">
                  e.g. mobilenumber@upi · name@okicici · name@paytm
                </p>
              </div>
            )}

            {/* ── Cash on Delivery ── */}
            {method === "cod" && (
              <div className="form-section fade-in cod-section">
                <div className="cod-icon">📦</div>
                <h3>Pay when your order arrives</h3>
                <p>
                  Your order will be delivered to your address. Please keep the
                  exact cash amount ready at the time of delivery.
                </p>
                <div className="cod-amount">
                  Amount to pay on delivery:{" "}
                  <strong>${total.toFixed(2)}</strong>
                </div>
              </div>
            )}

            <button
              id="place-order-btn"
              type="submit"
              className="btn-place-order"
            >
              🛒 Place Order – ${total.toFixed(2)}
            </button>
          </form>
        </div>

        {/* ── Right: Order Summary ── */}
        <div className="checkout-summary-panel">
          <h3>Order Summary</h3>
          <ul className="checkout-item-list">
            {appState.cart.map((item) => (
              <li key={item.id} className="checkout-item">
                <img src={item.image} alt={item.title} />
                <div className="checkout-item-info">
                  <p className="checkout-item-name">{item.title}</p>
                  <p className="checkout-item-price">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="checkout-divider" />
          <div className="checkout-total-row">
            <span>Subtotal ({appState.cart.length} items)</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="checkout-total-row">
            <span>Shipping</span>
            <span className="free-tag">FREE</span>
          </div>
          <div className="checkout-grand-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="checkout-secure-badge">
            🔒 Secured by SSL Encryption
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
