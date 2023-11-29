import "./home.css";
import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../../components/sideNav/SideNav.jsx";
import moneySVG from "../../assets/images/money.svg";
import syncIcon from "../../assets/images/sync.svg";
import arrowUp from "../../assets/images/arrow-up.svg";
import arrowDown from "../../assets/images/arrow-down.svg";
import BarChar from "../../components/charts/barChart.jsx";

const LandingPage = () => {
  return (
    <>
      <Outlet />
      <div className="dashboard_main_container">
        <SideNav />
        <div className="dashboard_container">
          <h1>Dashboard</h1>
          <div class="grid">
            <div class="item-1">
              <div>
                <p>Overview</p>
                <div>
                  <img src={moneySVG} alt="" />
                  <div>
                    <p>income</p>
                    <p>$9,876.33</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="item-2">
              <div>
                <div>
                  <div>
                    <img src={syncIcon} alt="" />
                    <p>Total Transactions</p>
                    <p>$20,850</p>
                  </div>
                </div>
                <div>
                  <div>
                    <img src={arrowDown} alt="" />
                    <p>Total Income</p>
                    <p>$20,850</p>
                  </div>
                </div>
                <div>
                  <div>
                    <img src={arrowUp} alt="" />
                    <p>Expenses</p>
                    <p>$20,850</p>
                  </div>
                </div>
                <div>
                  <div>
                    <img src={arrowDown} alt="" />
                    <p>Total Income</p>
                    <p>$20,850</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="item-3">
              <div className="barChart">
                <BarChar />
              </div>
            </div>
            <div class="item-4">
              <div className="feedBacks">
                <h1>Feedbacks</h1>
                <div>
                  <div className="avatar"></div>
                  <div>
                    <p>John Doe</p>
                    <p>on Product -3600</p>
                    <p>Great product, thank you!</p>
                  </div>
                </div>
                <div>
                  <div className="avatar"></div>
                  <div>
                    <p>John Doe</p>
                    <p>on Product -3600</p>
                    <p>Great product, thank you!</p>
                  </div>
                </div>
                <div>
                  <div className="avatar"></div>
                  <div>
                    <p>John Doe</p>
                    <p>on Product -3600</p>
                    <p>Great product, thank you!</p>
                  </div>
                </div>
                <div>
                  <div className="avatar"></div>
                  <div>
                    <p>John Doe</p>
                    <p>on Product -3600</p>
                    <p>Great product, thank you!</p>
                  </div>
                </div>
                <div>
                  <div className="avatar"></div>
                  <div>
                    <p>John Doe</p>
                    <p>on Product -3600</p>
                    <p>Great product, thank you!</p>
                  </div>
                </div>
                <div>
                  <div className="avatar"></div>
                  <div>
                    <p>John Doe</p>
                    <p>on Product -3600</p>
                    <p>Great product, thank you!</p>
                  </div>
                </div>
                <div>
                  <div className="avatar"></div>
                  <div>
                    <p>John Doe</p>
                    <p>on Product -3600</p>
                    <p>Great product, thank you!</p>
                  </div>
                </div>
                <div>
                  <div className="avatar"></div>
                  <div>
                    <p>John Doe</p>
                    <p>on Product -3600</p>
                    <p>Great product, thank you!</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="item-5">
              <div className="item5_container">
                <h2>Top 5:</h2>
                <div className="item5_main">
                  <div className="item5_main_nav">
                    <ul>
                      <li>Products</li>
                      <li>Categories</li>
                      <li>Customers</li>
                    </ul>
                  </div>
                  <div className="item5_main_content">
                    <div className="item5_titles">
                      <p>Product</p>
                      <p>Earning</p>
                    </div>
                    <div className="separator_line"></div>
                    <div>
                      <div className="item5_product">
                        <div>
                          <div id="img"></div>
                          <p>Product Name</p>
                        </div>
                        <div>
                          <p>$1.99</p>
                          <button>details</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="item-6">
              <p>item-6</p>
            </div>
            {/* <div class="item-7">
            <p>item-7</p>
          </div>
          <div class="item-8">
            <p>item-8</p>
          </div>
          <div class="item-9">
            <p>item-9</p>
          </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
