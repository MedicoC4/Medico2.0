import "./sideNav.css";
import React, {useState} from "react";
import { Link, Outlet } from 'react-router-dom';
import HomeIcon from "../../assets/images/home.svg";
import inventoryIcon from "../../assets/images/inventory.svg";
import productIcon from "../../assets/images/item-details.svg";
import productsIcon from "../../assets/images/product.svg";
import statisticsIcon from "../../assets/images/statistics.svg";


function SideNav() {

  const [sideNav, setSideNav] = useState(false)

  return (
    <div className={sideNav ? "opened" : "sideNav"} >
      <ul>
        <div className="list-item">
          <img className="icons" src={HomeIcon} alt="" />
          <li><Link className="Links" to='/dashboard'>dashboard</Link></li>
        </div>
        <div className="list-item">
          <img className="icons" src={inventoryIcon} alt="" />
          <li><Link className="Links" to="/add-product">Add Product</Link></li>
        </div>
        <div className="list-item">
          <img className="icons" src={productIcon} alt="" />
          <li><Link className="Links" to="/products">product overview</Link></li>
        </div>
        <div className="list-item">
          <img className="icons" src={productsIcon} alt="" />
          <li><Link className="Links" to="/orders">Orders</Link></li>
        </div>
        <div className="list-item">
          <img className="icons" src={statisticsIcon} alt="" />
          <li><Link className="Links" to="/statistics">statistics</Link></li>
        </div>
      </ul>
    </div>
  );
}

export default SideNav;
