import "./index.css";
import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "typeface-roboto";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </Provider>
  </BrowserRouter>
);
