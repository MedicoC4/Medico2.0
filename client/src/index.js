import "./index.css";
import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "typeface-roboto";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { AuthContextProvider } from "./context/AuthContext";
import { UserDataProvider } from "./context/UserDataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserDataProvider>
      <Provider store={store}>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </Provider>
    </UserDataProvider>
  </BrowserRouter>
);
