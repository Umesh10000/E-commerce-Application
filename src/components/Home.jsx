import React, { useContext, useEffect } from "react";
import { myContext } from "../App";
import "./Home.css";
import { useNavigate } from "react-router-dom";
const Home = () => {
  let appstate = useContext(myContext);
  let navigate=useNavigate()
  
  useEffect(() => {
    async function abc() {
      let res = await fetch("https://fakestoreapi.com/products");
      let data = await res.json();
      console.log(data);
      appstate.Dispatch({ type: "all", payload: data });
    }
    abc();
  }, []);
  if (appstate.loading) {
    return <div>loading....</div>;
  }
  return (
    <div className="home">
      <section className="all">
        {appstate.allproduct.map((e, i) => {
          return (
            <div key={e.id}>
              <img src={e.image} alt="" />
              <h3> price :{e.price}</h3>
              <h3>rating :{e.rating.rate}</h3>
              {
                appstate.cart.some((x)=>x.id==e.id) ?<button onClick={()=>{
                    navigate("cart")

                }}>viewcart</button> :
                <button
                  onClick={() => {
                    appstate.Dispatch({ type: "cart", payload: e });
                  }}
                >
                  Add to Cart
                </button>
              }
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Home;
