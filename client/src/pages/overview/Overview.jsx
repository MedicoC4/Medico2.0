import React from "react";
import css from "./overview.css";
import BarCharty from "./BarChart";
import icon from "../../assets/images/goals.png";
import icon2 from "../../assets/images/star.png";
import icon3 from "../../assets/images/book.png";
import icon4 from "../../assets/images/hour.png";
import icon5 from "../../assets/images/done.png";
import pp1 from "../../assets/images/pp1.png";
import pp2 from "../../assets/images/pp2.png";
import pp3 from "../../assets/images/pp3.png";
import Statistics from "./Statistics"


const Overview = () => {
  return (
    <div className="container">
      <div className="first-div">
      <p className="title">Pharmacy Overview</p>
      <div className="card1">
        <h1>Total Time Spent</h1>
        <h2>Total</h2>
        {/* <div className="chart-container"> */}
        <BarCharty />
        {/* </div> */}
      </div>
      <div className="cards-container">
        <div className="card2">
          <div className='icon'>
            <img src={icon} alt='icon' />
            <span>Goals</span>
          </div>
          <div className="subcard2">
            
            2/3 days</div>
        </div>
        <div className="card3">
          <div className='icon'>
            <img src={icon2} alt='icon' />
            <span>streaks</span>
          </div>
          <div className="subcard3">103 days</div>
        </div>
      </div>
      <p className="title2">Performance</p>
      <div className="card4-container">
        <div className="card4">
          <div className="subcard4">
            <img className="icon4" src={icon3} alt="icon" width={20} height={20}/>
          </div>
          <h3>Time spent</h3>
          <h3>Total</h3>
        </div>
        <div className="card4">
          <div className="subcard4">
            <img className="icon4" src={icon4} alt="icon" width={20} height={20} />
          </div>
          <h3>Average Hours/day</h3>
          <h3>Total</h3>
        </div>
        <div className="card4">
          <div className="subcard4">
            <img className="icon4" src={icon5} alt="icon" width={20} height={20}/>
          </div>
          <h3>Completed Courses</h3>
          <h3>Total</h3>
        </div>
      </div>
      </div>
      <div className="card5-container">
      <p className="title">Inventory Activity</p>
        <div className="card5">
          <h1>Monday</h1>
          <div className="profile-pic">
            <img src={pp1} alt="profile-pic" />
            <div>
              <h2>Medicine Inventory Management</h2>
              <p>John doe</p>
            </div>
          </div>
          <div className="profile-pic">
            <img src={pp2} alt="profile-pic" />
            <div>
              <h2>Prescription Filling Process</h2>
              <p>Jane Smith</p>
            </div>
          </div>
          <h1>Last Completed : 10 days ago</h1>
          <div className="profile-pic">
            <img src={pp3} alt="profile-pic" />
            <div>
              <h2>Pharmacist Certification</h2>
              <p>Abdouch</p>
            </div>
          </div>
          <div className="seperate"></div>
          <button className="viewmore">View More</button>
        </div>
        <p className="title2">Last Year Comparison</p>
            <Statistics />
      </div>
    </div>
  );
};

export default Overview;
