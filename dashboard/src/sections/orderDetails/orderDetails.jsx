import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { Menu, Steps, Space, Dropdown, Typography } from 'antd';

import { useRouter } from 'src/routes/hooks';

import './orderDetails.css';
import arrowLeft from '../../../public/assets/icons/navbar/left.svg';
import MasterCardIcon from '../../../public/assets/icons/glass/mastercard.svg';

const OrderDetails = () => {
  const { id } = useParams();

  const router = useRouter();

  const [order, setOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState('');
  const [refresh, setRefrech] = useState(false);

  console.log(orderStatus);
  useEffect(() => {
    const fetchOrdersDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:1128/api/orders/oneOrder/${id}`);
        setOrder(response.data);
        setOrderStatus(response.data?.livraisonStatus);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrdersDetails();
  }, [refresh, id]);

  const items = [
    {
      key: '1',
      label: 'Pending',
    },
    {
      key: '2',
      label: 'Processing',
    },
    {
      key: '3',
      label: 'Out for Delivery',
    },
    {
      key: '4',
      label: 'Delivered',
    },
  ];

  const updateDeliveryStatus = async (selectedStatus) => {
    try {
      await axios.patch(`http://127.0.0.1:1128/api/orders/update/${id}`, {
        livraisonStatus: selectedStatus,
      });

      // If the request is successful, update the local state
      setOrderStatus(selectedStatus);
      // Trigger a re-render by toggling the refresh state
      setRefrech((prevRefresh) => !prevRefresh);
    } catch (error) {
      console.error('Error updating delivery status:', error);
    }
  };

  const backk = () => {
    router.push('/orders');
  };
  return (
    <div className="order_details_main_container">
      <div className="order_details_container">
        <div className="order_details_child_container">
          <div className="order_detail_header">
            <div className="order_id">
              <div>
                <div className="back_ic" onClick={backk} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && backk()}>
                  <img className="back" src={arrowLeft} alt="" />
                </div>
                <h2>Order #{order?.tracking_number}</h2>
                <div className="order_id_status">
                  <p style={{ margin: '0' }}>{order?.orderStatus}</p>
                </div>
              </div>
              <p className="order_time" style={{ margin: '0' }}>
                {order?.createdAt}
              </p>
            </div>
            <div className="order_header_settings">
              <div>
                {/* <p style={{ margin: "0" }}>Completed</p> */}
                <Dropdown
                  overlay={
                    <Menu
                      onClick={(e) => {
                        updateDeliveryStatus(e.key);
                      }}
                      selectedKeys={[orderStatus]}
                    >
                      {items.map((item) => (
                        <Menu.Item key={item.label}>{item.label}</Menu.Item>
                      ))}
                    </Menu>
                  }
                  trigger={['click']}
                >
                  <Typography.Link>
                    <Space>
                      <p style={{ margin: '0', color: 'black' }}>{order?.livraisonStatus}</p>
                      <DownOutlined style={{ color: 'black' }} />
                    </Space>
                  </Typography.Link>
                </Dropdown>
              </div>
              <div>
                <p style={{ margin: '0' }}>Print</p>
              </div>
            </div>
          </div>
          <div className="order_details_statistics">
            <div className="first_col_order">
              <div className="order_detailssss">
                <div className="order_detailssss_header">
                  <div>
                    <p id="order_det_tit">Details</p>
                    <div className="order_det_wrapper">
                      <img id="img" src={order?.Product.imageURL} alt="" />
                      <div className="nike">
                        <p>{order?.Product.productName}</p>
                        <p>{order?.Product.codebar}</p>
                      </div>
                    </div>
                  </div>
                  <div className="price_order">
                    <p>x{order?.quantityOrdered}</p>
                    <p>${order?.total}</p>
                  </div>
                </div>
                <div className="order_divider" />
                <div className="order_subtotal">
                  <div className="order_subtotal_wrapper">
                    <ul>
                      <li>Subtotal</li>
                      <li>Shipping</li>
                      <li>Discount</li>
                      <li>Taxes</li>
                      <li>Total</li>
                    </ul>
                    <ul>
                      <li>${order?.total}</li>
                      <li>- $10</li>
                      <li>- $10</li>
                      <li>$10</li>
                      <li>$73.74</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="order_history">
                <h2>History</h2>
                <div className="order_tracking_container">
                  <div className="order_tracking">
                    <Steps
                      progressDot
                      current={items.findIndex((item) => item.label === order?.livraisonStatus)}
                      direction="vertical"
                      items={[
                        {
                          title: 'Order has been created',
                          description: 'This is a description. This is a description.',
                        },
                        {
                          title: 'The shipping unit has picked up the goods',
                          description: 'This is a description.',
                        },
                        {
                          title: 'Transporting to [1]',
                          description: 'This is a description.',
                        },
                        {
                          title: 'Delivery successful',
                          description: 'This is a description. This is a description.',
                        },
                      ]}
                    />
                  </div>
                  <div className="order-timing">
                    <div>
                      <p>Order time</p>
                      <p>14 Nov 2023 9:03 AM</p>
                    </div>
                    <div>
                      <p>Payment time</p>
                      <p>14 Nov 2023 9:03 AM</p>
                    </div>
                    <div>
                      <p>Delivery time for the carrier</p>
                      <p>14 Nov 2023 9:03 AM</p>
                    </div>
                    <div>
                      <p>Completion time</p>
                      <p>14 Nov 2023 9:03 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="second_col_detailssss">
              <div className="Customer-Info">
                <h2>Customer Info</h2>
                <div>
                  <img
                    src="https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg"
                    alt=""
                  />
                  <div>
                    <p>{order?.User.username}</p>
                    <p>{order?.User.email}</p>
                    <p>IP Address:192.158.1.38</p>
                  </div>
                </div>
              </div>
              <div className="order_divider" />
              <div className="Delivery">
                <h2>Delivery</h2>
                <div>
                  <ul>
                    <li>Ship by</li>
                    <li>Speedy</li>
                    <li>Tracking No.</li>
                  </ul>
                  <ul>
                    <li>DHL</li>
                    <li>Standard</li>
                    <li>{order?.tracking_number}</li>
                  </ul>
                </div>
              </div>
              <div className="order_divider" />
              <div className="Shipping">
                <h2>Shipping</h2>
                <div>
                  <p>Address</p>
                  <p>{order?.address}</p>
                  <p>Phone number</p>
                  <p>{order?.phoneNumber}</p>
                </div>
              </div>
              <div className="order_divider" />
              <div className="Payment">
                <h2>Payment</h2>
                <div>
                  <p>Phone number</p>
                  <div>
                    <p>**** **** **** 5678</p>
                    <img src={MasterCardIcon} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
