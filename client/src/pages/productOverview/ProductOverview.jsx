import React, { useState, useEffect } from "react";
import "./style.css";
import SideNav from "../../components/sideNav/SideNav";
import DataGrid from "../../components/dataGrid/dataGrid";
import { collection, onSnapshot, query } from "firebase/firestore";
import { DB } from "../../firebase-config";
import { Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router";
import ProductDetails from "../productDetails/ProductDetails";
import axios from "axios";

const ProductOverview = () => {
  const [data, setData] = useState([]);
  const [prodId, setPredId] = useState("");
  const navigate = useNavigate();
  console.log(data);
  function timestampToDate(timestamp) {
    if (timestamp instanceof Timestamp) {
      const date = timestamp.toDate();
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear().toString();
      return `${day}/${month}/${year}`;
    }
    return null;
  }

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:1128/api/Product/getAll");
      setData(response.data)
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData()
  }, [])

  console.log(data);  

  return (
    <div className="all_product_container">
      <SideNav />
      <div className="body_cards_container">
        <h1>Products</h1>
        <DataGrid data={data} />
      </div>
    </div>
  );
};

export default ProductOverview;
