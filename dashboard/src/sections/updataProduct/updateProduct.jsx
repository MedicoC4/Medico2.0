import axios from 'axios';
import dayjs from 'dayjs';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useMemo, useState, useEffect } from 'react';

import { Button } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// import {
//   RadiusBottomleftOutlined,
//   RadiusBottomrightOutlined,
//   RadiusUpleftOutlined,
//   RadiusUprightOutlined,
// } from '@ant-design/icons';
import { notification } from 'antd';

import { auth } from 'src/firebase-config';

import './updateProduct.css';

const Context = React.createContext({
  name: 'Default',
});

const UpdateProdut = () => {
  const [catregories, setCategories] = useState([]);
  const [product, setProduct] = useState({});
  const [valuee, setValuee] = React.useState(dayjs());
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement) => {
    api.success({
      message: 'Update Successful',
      description: 'The product was updated successfully.',
      placement: 'topRight',
      onClose: () => {
        console.log('Notification closed'); // You can add additional actions on close if needed
      },
    });
  };

  const openErrorNotification = (placement) => {
    api.error({
      message: 'Update Failed',
      description: 'There was an error updating the product. Please check your information and try again.',
      placement: 'topRight',
      onClose: () => {
        console.log('Notification closed'); // You can add additional actions on close if needed
      },
    });
  };

  const contextValue = useMemo(
    () => ({
      name: 'Ant Design',
    }),
    []
  );

  const { productId } = useParams();
  const navigate = useNavigate()
  //   console.log(productId);

  const [inputs, setInputs] = useState({
    productName: product?.productName || '',
    price: product?.price || '',
    stock: product?.stock || '',
    description: product?.description || '',
    manufacturer: product?.manufacturer || '',
    activeIngredients: product?.activeIngredients || '',
    dosageForm: product?.dosageForm || '',
    strength: product?.strength || '',
    packaging: product?.packaging || '',
    expiryDate: product?.expiryDate || valuee,
    imageURL: product?.imageURL || '',
    sideEffect: product?.sideEffect || '',
    codebar: product?.codebar || '',
    CategoryId: product?.CategoryId || '',
  });

  // const formattedExpiryDate = `${
  //   valuee.$d.getMonth() + 1
  // }-${valuee.$d.getDate()}-${valuee.$d.getFullYear()}`;

  const [file, setFile] = useState(null);
  console.log(file);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    console.log('hello', selectedFile);
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', 'qyrzp0xv');
    const response = await axios.post('https://api.cloudinary.com/v1_1/dp42uyqn5/upload', formData);
    console.log(response.data.secure_url);
    setFile(response.data.secure_url);
  };

  console.log(auth?.currentUser?.email, 'usersssssssssssssssss');

  console.log(catregories);

  useEffect(() => {
    const categories = async () => {
      const response = await axios.get('http://127.0.0.1:1128/api/category/getAll');
      setCategories(response?.data);
    };
    categories();
  }, []);

  const updateProducts = async (data) => {
    try {
      const cleanInputs = JSON.parse(JSON.stringify(inputs));
      await axios.patch(
        `http://127.0.0.1:1128/api/product/updateProduct/${productId}`,
        cleanInputs
      );
      console.log('Product updated successfully');
      openNotification('topRight');
      setTimeout(() => {
        navigate('/product-overview')
      }, 1500)
      // Additional actions or state updates after successful update
    } catch (error) {
      console.error('Error updating product:', error.message);
      openErrorNotification('topRight')
      // Handle error or display an error message to the user
    }
  };

  const fetchProduct = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:1128/api/product/getOne/${id}`);
      setProduct(response?.data);
      console.log(response?.data);
    } catch (error) {
      console.error('Error fetching product:', error.message);
      // Handle the error as needed
    }
  };

  useEffect(() => {
    fetchProduct(productId);
  }, [productId]);

  useEffect(() => {
    setInputs({
      productName: product.productName || '',
      price: product.price || '',
      stock: product.stock || '',
      description: product.description || '',
      manufacturer: product.manufacturer || '',
      activeIngredients: product.activeIngredients || '',
      dosageForm: product.dosageForm || '',
      strength: product.strength || '',
      packaging: product.packaging || '',
      expiryDate: product.expiryDate || '',
      imageURL:
        product.imageURL ||
        'https://www.parafendri.tn/2330-medium_default/svr-sun-secure-blur-creme-mousse-spf50.jpg',
      sideEffect: product.sideEffect || '',
      codebar: product.codebar || '',
      CategoryId: product.CategoryId || '',
    });
  }, [product]);

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div
        style={{
          paddingLeft: '1.8rem',
          paddingRight: '1.8rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        <h1 style={{ paddingBottom: '1rem' }}>Create a new product</h1>
        <div style={{ display: 'flex', height: 'auto' }}>
          <div
            style={{
              width: '70%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            <h2 style={{ margin: '0' }}>Details</h2>
            <p>Title, short description, image...</p>
          </div>
          <div className="prod_Propreties">
            <TextField
              id="outlined-basic"
              label="Product Name"
              variant="outlined"
              name="productName"
              onChange={handleInputChange}
              value={inputs.productName}
              focused
            />
            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={5}
              variant="outlined"
              name="description"
              onChange={handleInputChange}
              value={inputs.description}
              focused
            />
            <div className="img_upload">
              <input type="file" onChange={handleFileChange} />
              <img src={inputs.imageURL} alt="" />
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', height: 'auto' }}>
          <div
            style={{
              width: '70%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            <h2 style={{ margin: '0' }}>Properties</h2>
            <p>Additional functions and attributes...</p>
          </div>
          <div className="prod_Propreties">
            <div className="prod_Propretiess">
              <TextField
                id="outlined-basic"
                label="Manufacturer"
                variant="outlined"
                name="manufacturer"
                onChange={handleInputChange}
                value={inputs.manufacturer}
                focused
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={inputs.CategoryId}
                  name="CategoryId"
                  label="Category"
                  onChange={handleInputChange}
                >
                  {catregories.map((category) => (
                    <MenuItem key={category?.id} value={category?.id}>
                      {category?.name}
                    </MenuItem>
                  ))}
                  {/* <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
              </FormControl>
              <TextField
                id="outlined-basic"
                label="Strength"
                variant="outlined"
                name="strength"
                onChange={handleInputChange}
                value={inputs.strength}
                focused
              />
              <TextField
                id="outlined-basic"
                label="Dosage Form"
                variant="outlined"
                name="dosageForm"
                onChange={handleInputChange}
                value={inputs.dosageForm}
                focused
              />
              <TextField
                id="outlined-basic"
                label="Active Ingredients"
                variant="outlined"
                name="activeIngredients"
                onChange={handleInputChange}
                value={inputs.activeIngredients}
                focused
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    label="Expiry Date"
                    style={{ width: '100%' }}
                    name="expiryDaate"
                    slotProps={{
                      textField: {
                        helperText: 'MM/DD/YYYY',
                      },
                    }}
                    value={valuee}
                    onChange={(newValue) => setValuee(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className="second_sec">
              <TextField
                id="outlined-basic"
                label="Side Effect"
                variant="outlined"
                style={{ width: '100%' }}
                name="sideEffect"
                onChange={handleInputChange}
                value={inputs.sideEffect}
                focused
              />
              <TextField
                id="outlined-basic"
                label="Packaging"
                variant="outlined"
                name="packaging"
                style={{ width: '100%' }}
                onChange={handleInputChange}
                value={inputs.packaging}
                focused
              />
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', height: 'auto' }}>
          <div
            style={{
              width: '70%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            <h2 style={{ margin: '0' }}>Pricing</h2>
            <p>Price related inputs</p>
          </div>
          <div className="prod_Propreties">
            <FormControl>
              <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
              <OutlinedInput
                name="price"
                onChange={handleInputChange}
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Amount"
                value={inputs.price}
                focused
              />
            </FormControl>
            <TextField
              id="outlined-basic"
              label="Quantity"
              name="stock"
              onChange={handleInputChange}
              variant="outlined"
              value={inputs.stock}
              focused
            />
            <TextField
              id="outlined-basic"
              label="Code bar"
              variant="outlined"
              name="codebar"
              onChange={handleInputChange}
              value={inputs.codebar}
              focused
            />
          </div>
        </div>
        <div className="publish_button">
          <Button
            style={{ width: '10rem', backgroundColor: '#212B36' }}
            size="large"
            variant="contained"
            onClick={updateProducts}
          >
            Update Product
          </Button>
        </div>
      </div>
    </Context.Provider>
  );
};

export default UpdateProdut;
