import "./App.css";
import React, { useEffect, useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ProductOverview from "./pages/productOverview/ProductOverview";
import AddProduct from "./pages/addProduct/AddProduct.jsx";
import Overview from "./pages/overview/Overview";
import Home from "./pages/dashboard/LandingPage";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Statistics from "./pages/statistics/Statistics";
import SideNav from "./components/sideNav/SideNav";
import ResetePassword from "./pages/resetePassword/ResetePassword";
import Landing from "./pages/landingPage/landing";
import Ordering from "./pages/ordering/OrderList.jsx";
import { gsap } from "gsap-trial";
import { ScrollTrigger } from "gsap-trial/ScrollTrigger";
import { ScrollSmoother } from "gsap-trial/ScrollSmoother";
import { TransitionProvider } from "./context/TransitionContext.jsx";
import TransitionComponent from "./components/Transition/Transition.jsx";
import { AuthContext } from "./context/AuthContext.js";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
const App = () => {
  const location = useLocation();

  const { currentUser } = useContext(AuthContext)
  console.log(currentUser)
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/dashboard" />;
  };




  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    window.addEventListener("popstate", scrollToTop);
    return () => {
      window.removeEventListener("popstate", scrollToTop);
    };
  }, []);

  return (
    <div>
      {/* <SideNav /> */}
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          classNames="fade"
          timeout={300}
          appear
        >
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="products" element={<ProductOverview />} />
            <Route
              path="product-detail/:productId"
              element={<ProductDetails />}
            />
            <Route path="statistics" element={<Statistics />} />
            <Route path="reset-password" element={<ResetePassword />} />
            <Route path="orders" element={<Ordering />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default App;
