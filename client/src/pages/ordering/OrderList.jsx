import "./cardList.css";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SideNav from "../../components/sideNav/SideNav";
import axios from "axios";
// import { or } from "firebase/firestore"; // This import is not used

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [disabledButtons, setDisabledButtons] = useState(false);

  const [activeItem, setActiveItem] = useState(0);
  const indicatorRef = useRef(null);

  const handleIndicator = (index, el) => {
    setActiveItem(index);

    if (indicatorRef.current) {
      indicatorRef.current.style.width = `${el.offsetWidth}px`;
      indicatorRef.current.style.left = `${el.offsetLeft}px`;
      indicatorRef.current.style.backgroundColor = el.getAttribute('active-color');
    }
  };

  const items = [
    { label: 'Home', color: 'orange' },
    { label: 'About', color: 'green' },
    { label: 'Testimonials', color: 'blue' },
    { label: 'Blog', color: 'red' },
    { label: 'Contact', color: 'rebeccapurple' },
  ];

  console.log(orders);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:1128/api/orders/getAll"
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(
        `http://127.0.0.1:1128/api/orders/updateOrder/${orderId}`,
        {
          orderStatus: newStatus,
        }
      );

      const getOrderQ = await axios.get(
        `http://127.0.0.1:1128/api/orders/oneOrder/${orderId}`
      );
      console.log(getOrderQ.data.ProductId);
      const pID = getOrderQ.data.ProductId;
      const getProductQ = await axios.get(
        `http://127.0.0.1:1128/api/Product/getOne/${pID}`
      );
      let orderQ = getOrderQ.data.quantityOrdered;
      let prodQ = getProductQ.data.stock - orderQ;

      if (getOrderQ.data.orderStatus === "Accepted") {
        await axios.patch(
          `http://127.0.0.1:1128/api/product/updateProductQuantity/${pID}`,
          { stock: prodQ }
        );
      }
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="main_order_container">
      <SideNav />
      <div className="order-content" style={{ padding: "2rem" }}>
        <div className="grid-container">
          <div className="grid-item header">Order ID</div>
          <div className="grid-item header">Product Name</div>
          <div className="grid-item header">Item</div>
          <div className="grid-item header">Quantity</div>
          <div className="grid-item header">Price</div>
          <div className="grid-item header">Total</div>
          <div className="grid-item header">Status</div>
          <div className="grid-item header">Action</div>
          {orders.map((order, index) => (
            <React.Fragment key={index}>
              <div className="grid-item">
                <Link
                  to={`/order-details/${order.order_id}`}
                  className="orders_link"
                >
                  {order.tracking_number}
                </Link>
              </div>
              <div className="grid-item">Product A</div>
              <div className="grid-item">
                <img
                  src="https://www.francetvinfo.fr/pictures/AoHuy6lKW2ZUVKOL3XVLYR8xy3I/1200x900/2022/12/06/638f27500e338_000-32nv9ly.jpg"
                  alt=""
                />
              </div>
              <div className="grid-item">{order.quantityOrdered}</div>
              <div className="grid-item">$20.00</div>
              <div className="grid-item">${order.total}</div>
              <div className="grid-item">{order.orderStatus}</div>
              <div className="grid-item grid-btn">
                <button
                  onClick={() => updateOrderStatus(order.order_id, "Accepted")}
                  disabled={disabledButtons}
                  className={disabledButtons ? "disabled" : ""}
                >
                  accept
                </button>
                <button
                  onClick={() => {
                    updateOrderStatus(order.order_id, "Rejected");
                    if (order.orderStatus === "Rejected") {
                      setDisabledButtons(true);
                    }
                  }}
                  disabled={disabledButtons}
                  className={disabledButtons ? "disabled" : ""}
                >
                  reject
                </button>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div>
          <nav className="nav">
            {items.map((item, index) => (
              <a
                key={index}
                href="#"
                className={`nav-item ${
                  index === activeItem ? "is-active" : ""
                }`}
                active-color={item.color}
                onClick={(e) => handleIndicator(index, e.currentTarget)}
              >
                {item.label}
              </a>
            ))}
            <span ref={indicatorRef} className="nav-indicator"></span>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
