import React, { createContext, useReducer } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Cart from "./components/Cart";
export let myContext = createContext();
function reducer(state, action) {
  switch (action.type) {
    case "all":
      return { ...state, allproduct: action.payload, loading: false };
      case "cart":
        return {...state,cart:[...state.cart,action.payload]};
        case "remove" :
          return {...state,cart:action.payload}
  }
}

const App = () => {
  let [state, Dispatch] = useReducer(reducer, {
    allproduct: [],
    oneProdust: {},
    cart: [],
    loading: true,
    error: false,
  });
  let myRouter = createBrowserRouter([
    {
      path: "/",
      element: <Nav></Nav>,
      children: [{ index: true, element: <Home></Home> },
        {path:"cart",element:<Cart></Cart>}
      ],
    },
  ]);

  return (
    <div className="app">
      <myContext.Provider value={{ ...state, Dispatch }}>
        <RouterProvider router={myRouter}></RouterProvider>
      </myContext.Provider>
    </div>
  );
};

export default App;
