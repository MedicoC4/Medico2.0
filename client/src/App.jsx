import "./App.css";
import React, { useEffect, useState, useContext, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { gsap } from "gsap-trial";
import { ScrollTrigger } from "gsap-trial/ScrollTrigger";
import { ScrollSmoother } from "gsap-trial/ScrollSmoother";
import { TransitionProvider } from "./context/TransitionContext.jsx";
import TransitionComponent from "./components/Transition/Transition.jsx";
import { AuthContext } from "./context/AuthContext.js";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Lazy-loaded components
const Layout = lazy(() => import("./layouts/layouts.jsx"));
const Landing = lazy(() => import("./pages/landingPage/landing"));
const Home = lazy(() => import("./pages/dashboard/LandingPage"));
const AddProduct = lazy(() => import("./pages/addProduct/AddProduct.jsx"));
const ProductOverview = lazy(() =>
  import("./pages/productOverview/ProductOverview")
);
const ProductDetails = lazy(() =>
  import("./pages/productDetails/ProductDetails")
);
const Statistics = lazy(() => import("./pages/statistics/Statistics"));
const ResetePassword = lazy(() =>
  import("./pages/resetePassword/ResetePassword")
);
const Ordering = lazy(() => import("./pages/ordering/OrderList.jsx"));
const OderDetails = lazy(() => import("./pages/ordering/OderDetails.jsx"));
const MissingProd = lazy(() =>
  import("./pages/missingProducts/MissingProd.jsx")
);

const App = () => {
  const location = useLocation();
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

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
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          classNames="fade"
          timeout={300}
          appear
        >
          <Suspense
            fallback={
              <div class="loader">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="homee" element={<Layout />}>
                <Route
                  path="dashboard"
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
                <Route
                  path="order-details/:orderId"
                  element={<OderDetails />}
                />
                <Route path="missing-products" element={<MissingProd />} />
              </Route>
            </Routes>
          </Suspense>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default App;
