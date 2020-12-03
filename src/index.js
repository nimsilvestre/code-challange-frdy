import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

//Redux & RTK
import { Provider } from "react-redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import CarSlice from "./features/car/carSlice";

const reducer = {
  cars: CarSlice,
};

let middleware = getDefaultMiddleware();

const store = configureStore({
  reducer,
  middleware,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
