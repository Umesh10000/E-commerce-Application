import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="success-page">
      <div className={`success-card ${visible ? "show" : ""}`}>
        <div className="success-circle">
          <svg
            viewBox="0 0 52 52"
            className="checkmark-svg"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="checkmark-circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark-check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>

        <h1 className="success-title">Order Placed!</h1>
        <p className="success-sub">
          🎉 Thank you for shopping with us. Your order has been confirmed and
          is being processed.
        </p>

        <div className="success-info-grid">
          <div className="info-card">
            <span>🚚</span>
            <p>Estimated Delivery</p>
            <strong>3-5 Business Days</strong>
          </div>
          <div className="info-card">
            <span>📧</span>
            <p>Confirmation</p>
            <strong>Email Sent</strong>
          </div>
          <div className="info-card">
            <span>🔒</span>
            <p>Payment</p>
            <strong>Secured</strong>
          </div>
        </div>

        <button
          id="continue-shopping-btn"
          className="btn-continue"
          onClick={() => navigate("/")}
        >
          🛍 Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
