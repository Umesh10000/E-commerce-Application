import React, { useContext } from "react";
import { myContext } from "../App";
import "./Cart.css";

const Cart = () => {
  let appState = useContext(myContext);

  return (
    <div className="cart">
      {appState.cart.length > 0 ? (
        appState.cart.map((e) => {
          return (
            <div key={e.id}>
              <img src={e.image} alt="" />
              <h3>{e.price}</h3>
              <h3>{e.rating.rate}</h3>
              <button
                onDoubleClick={() => {
                  let filtered = appState.cart.filter((x) => x.id !== e.id);
                  appState.Dispatch({
                    type : "remove",
                    payload :filtered
                  });
                }}
              >
                remove
              </button>
            </div>
          );
        })
      ) : (
        <h1>no products in cart</h1>
      )}
    </div>
  );
};

export default Cart;
