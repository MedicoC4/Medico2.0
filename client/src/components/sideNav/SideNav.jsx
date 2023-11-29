import "./sideNav.css";
import React from "react";
import { Link, Outlet } from 'react-router-dom';
import HomeIcon from "../../assets/images/home.svg";
import inventoryIcon from "../../assets/images/inventory.svg";
import productIcon from "../../assets/images/item-details.svg";
import productsIcon from "../../assets/images/product.svg";
import statisticsIcon from "../../assets/images/statistics.svg";


function SideNav() {
  return (
    <div className="sideNav">
      <ul>
        <div className="list-item">
          <img className="icon" src={HomeIcon} alt="" />
          <li><Link className="Links" to='/dashboard'>dashboard</Link></li>
        </div>
        <div className="list-item">
          <img className="icon" src={inventoryIcon} alt="" />
          <li><Link className="Links" to="/add-product">Add Product</Link></li>
        </div>
        <div className="list-item">
          <img className="icon" src={productIcon} alt="" />
          <li><Link className="Links" to="/products">product overview</Link></li>
        </div>
        <div className="list-item">
          <img className="icon" src={productsIcon} alt="" />
          <li><Link className="Links" to="/orders">Orders</Link></li>
        </div>
        <div className="list-item">
          <img className="icon" src={statisticsIcon} alt="" />
          <li><Link className="Links" to="/statistics">statistics</Link></li>
        </div>
      </ul>
    </div>
  );
}

export default SideNav;
