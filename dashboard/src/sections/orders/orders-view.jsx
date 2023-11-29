import axios from 'axios'; // Move 'axios' above '@ant-design/icons'
import { Tabs } from 'antd';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { DataGrid } from '@mui/x-data-grid';

import './OrdersView.css'

const { TabPane } = Tabs;

const OrdersView = () => {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState('1');
  const [disable, setDisable] = useState(false)
  console.log(data);

  const onChange = (key) => {
    console.log(key);
    setActiveTab(key);
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:1128/api/orders/getAll`);
      // const rowsWithIds = response.data.map((row, index) => ({ id: index + 1, ...row }));
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {

    fetchOrders();
  }, []);

  


  const updateOrderStatus = async (orderId, newStatus) => {
    console.log(orderId, newStatus)
    try {
      await axios.patch(
        `http://127.0.0.1:1128/api/orders/update/${orderId}`,
        {
          orderStatus: newStatus,
        }
      );

      const getOrderQ = await axios.get(
        `http://127.0.0.1:1128/api/orders/oneOrder/${orderId}`
      );
      console.log(getOrderQ?.data.ProductId);
      const pID = getOrderQ?.data.ProductId;
      const getProductQ = await axios.get(
        `http://127.0.0.1:1128/api/Product/getOne/${pID}`
      );
      const orderQ = getOrderQ.data.quantityOrdered;
      const prodQ = getProductQ.data.stock - orderQ;

      if (getOrderQ.data.orderStatus === "Accepted") {
        await axios.patch(
          `http://127.0.0.1:1128/api/product/updateProductQuantity/${pID}`,
          { stock: prodQ }
        );
        setDisable(true)
      } else {
        setDisable(true)
      }
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error.message);
    }
  };

  function timestampToDate(timestamp) {
    const formattedDate = new Date(timestamp).toLocaleDateString();
    return `${formattedDate}`;
  }

  const columns = [
    {
      field: 'tracking_number',
      headerName: 'Order ID',
      width: 150,
      editable: false,
      renderCell: ({ row }) => (
        <Link to={`/orders/orders-detail/${row.id}`} className='prod_details'>
          {row.tracking_number}
        </Link>
      ),
    },
    {
      field: 'orderStatus',
      headerName: 'Product Name',
      width: 100,
      editable: false,
      headerClassName: 'custom-header-class',
    },
    {
      field: 'quantityOrdered',
      headerName: 'Quantity',
      width: 117,
      editable: false,
      headerClassName: 'custom-header-class',
    },
    {
      field: 'createdAt',
      headerName: 'createdAt',
      width: 150,
      editable: false,
      headerClassName: 'custom-header-class',
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 175,
      editable: false,
      headerClassName: 'custom-header-class',
      valueGetter: (params) => timestampToDate(params.row.createdAt),
    },
    {
      field: 'livraisonStatus',
      headerName: 'livraisonStatus',
      width: 130,
      editable: false,
      headerClassName: 'custom-header-class',
    },
    {
      field: 'orderStatus',
      headerName: 'Status',
      width: 90,
      editable: false,
      headerClassName: 'custom-header-class',
    },
    {
      field: '',
      headerName: 'Action',
      width: 170,
      editable: false,
      renderCell: ({ row }) => (
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', gap:'1rem'}}>
          <button
            type="button"
            onClick={() => updateOrderStatus(row.id, "Accepted")}
            style={{
              backgroundColor: '#22C55E',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '1rem',
              cursor: 'pointer',
            }}
            disabled={disable}
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => updateOrderStatus(row.id, "Rejected")}
            style={{
              backgroundColor: '#FF5630',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '1rem',
              cursor: 'pointer',
            }}
            disabled={disable}
          >
            Reject
          </button>
        </div>
      ),
    },
  ];

  const getTabContent = (key) => {
    switch (key) {
      case '1':
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        );
      case '2':
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        );
      case '3':
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        );
      default:
        return null;
    }
  };

  const items = [
    {
      key: '1',
      label: 'All',
      icon: (
        <div>
          <p
            style={{
              margin: '0',
              backgroundColor: 'rgb(33, 43, 54)',
              color: 'white',
              height: '24px',
              minWidth: '24px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '6px',
              whiteSpace: 'nowrap',
              textTransform: 'capitalize',
              padding: '0px 8px',
              fontWeight: '700',
              fontSize: '0.75rem',
            }}
          >
            20
          </p>
        </div>
      ),
    },
    {
      key: '2',
      label: 'Pending',
      icon: (
        <div>
          <p style={{ margin: '0' }}>20</p>
        </div>
      ),
    },
    {
      key: '3',
      label: 'Completed',
      icon: (
        <div>
          <p style={{ margin: '0' }}>20</p>
        </div>
      ),
    },
    {
      key: '4',
      label: 'Cancelled',
      icon: (
        <div>
          <p style={{ margin: '0' }}>20</p>
        </div>
      ),
    },
  ];

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '100%', paddingLeft: '1rem', paddingRight: '1rem' }}>
        <h3>Orders</h3>
        <div
          className="orders_container"
          style={{
            backgroundColor: 'rgb(252, 252, 252)',
            height: '85vh',
            padding: '1rem',
            borderRadius: '2rem',
            boxShadow:'box-shadow: rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;'
          }}
        >
          <div className="order_table_header_container">
            <Tabs
              style={{ width: '100%',backgroundColor:'transparent' }}
              defaultActiveKey="1"
              activeKey={activeTab}
              onChange={onChange}
              tabBarStyle={{
                paddingLeft: '2rem', // Normal border-bottom style
              }}
            >
              {items.map((item) => (
                <TabPane
                  key={item.key}
                  tab={
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <p style={{ margin: '0', fontSize: '0.875rem', fontWeight: '600' }}>
                        {item.label}
                      </p>
                      {item.icon && <span style={{ marginLeft: '12px' }}>{item.icon}</span>}
                    </span>
                  }
                >
                  {getTabContent(item.key)}
                </TabPane>
              ))}
            </Tabs>
          </div>
          <DataGrid
            rows={data}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            sx={{
              '&, [class^=MuiDataGrid]': {
                border: 'none',
                borderRadius: '1rem',
                gap: '0.6rem 0rem',
              },
              height: 550,
              border: 'none',
              '[class^=MuiDataGrid-cellContent]': { borderRadius: '0' },
            }}
            getRowClassName={(params) => (params.row.image ? 'image-row' : '')}
            getRowHeight={() => 60}
          />
        </div>
      </div>
    </div>
  );
};

export default OrdersView;
