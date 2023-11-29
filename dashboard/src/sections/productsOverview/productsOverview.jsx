import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { DataGrid } from '@mui/x-data-grid';

import './productOverview.css';
import plus from '../../../public/assets/icons/navbar/plus.svg';

const ProductsOverview = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  console.log(data);

  const usersaa = JSON.parse(localStorage.getItem('userData') || '{}');
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:1128/api/Product/phProduct/${usersaa.data.email}`
        );
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
    fetchProduct();
  }, [usersaa.data.email]);

  const handleUpdate = (id) => {
    axios
      .get(`http://127.0.0.1:1128/api/product/getOne/${id}`)
      .then((res) => {
        console.log(res);
        navigate(`updateProd/${id}`);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:1128/api/Product/deleteProduct/${id}`)
      .then((res) => {
        console.log(res);
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setData(data);
  }, [data]);

  function timestampToDate(timestamp) {
    const formattedDate = new Date(timestamp).toLocaleDateString();
    return `${formattedDate}`;
  }

  const columns = [
    {
      field: 'productImage',
      headerName: 'Product',
      width: 240,
      editable: false,
      renderCell: ({ row }) => {
        const { imageURL, productName } = row;

        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={imageURL}
              alt={productName}
              style={{ width: 60, height: 40, objectFit: 'contain' }}
            />
            <Link to={`/product-overview/product-details/${row.id}`}>
              <div style={{ marginLeft: '1rem' }}>{productName}</div>
            </Link>
          </div>
        );
      },
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 100,
      editable: false,
      headerClassName: 'custom-header-class',
    },
    {
      field: 'CategoryId',
      headerName: 'Categories',
      width: 120,
      editable: false,
      headerClassName: 'custom-header-class',
    },
    {
      field: 'stock',
      headerName: 'Quantity',
      width: 117,
      editable: false,
      headerClassName: 'custom-header-class',
    },
    {
      field: 'codebar',
      headerName: 'Code Bar',
      width: 150,
      editable: false,
      headerClassName: 'custom-header-class',
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 150,
      editable: false,
      headerClassName: 'custom-header-class',
      valueGetter: (params) => timestampToDate(params.row.createdAt),
    },
    {
      field: 'update',
      headerName: 'Update',
      width: 100,
      editable: false,
      headerClassName: 'custom-header-class',
      renderCell: ({ row }) => (
        <button
          type="button"
          onClick={() => {
            handleUpdate(row.id);
          }}
        >
          Update
        </button>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 100,
      editable: false,
      renderCell: ({ row }) => (
        <button
          type="button"
          onClick={() => {
            handleDelete(row.id);
          }}
        >
          delete
        </button>
      ),
    },
  ];

  return (
    <div
      style={{
        padding: '0',
        backgroundColor: 'rgb(252, 252, 252)',
        height: '85vh',
        borderRadius: '2rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
      }}
      className="main_product_container"
    >
      <div className="product_container_header">
        <p>Product List</p>
        <Link to="/product-overview/add-product">
          <div className="add_product">
            <img src={plus} alt="" />
            <p style={{ margin: '0' }}>New Product</p>
          </div>
        </Link>
      </div>
      <DataGrid
        rows={data}
        columns={columns}
        rowSelection={false}
        checkboxSelection
        disableRowSelectionOnClick
        style={{
          boxShadow:
            'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
          padding: '1rem',
          borderRadius: '2rem',
        }}
        sx={{
          '&, [class^=MuiDataGrid]': {
            border: 'none',
            gap: '0.6rem 0rem',
            borderRadius: '0.8rem',
          },
          height: 560,
          border: 'none',
          '[class^=MuiDataGrid-cellContent]': {border: 'none', borderRadius: '0' },
        }}
        getRowClassName={(params) => (params.row.image ? 'image-row' : '')}
        getRowHeight={() => 60}
      />
    </div>
  );
};

export default ProductsOverview;
