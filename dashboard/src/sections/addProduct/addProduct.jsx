import axios from 'axios';
import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';

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

import { auth } from 'src/firebase-config';

import './addProduct.css';

const AddProduct = () => {
  const [catregories, setCategories] = useState([]);
  const [valuee, setValuee] = React.useState(dayjs());
  console.log(catregories);
  
  const formattedExpiryDate = `${
    valuee.$d.getMonth() + 1
  }-${valuee.$d.getDate()}-${valuee.$d.getFullYear()}`;
  
  console.log(formattedExpiryDate);
  const [inputs, setInputs] = useState({
    productName: '',
    price: '',
    stock: '',
    description: '',
    manufacturer: '',
    activeIngredients: '',
    dosageForm: '',
    strength: '',
    packaging: '',
    expiryDate: formattedExpiryDate,
    sideEffect: '',
    codebar: '',
    // PharmacyId: userData.Pharmacy.id,
    CategoryId: '',
  });

  console.log(inputs);

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
    console.log(response?.data?.secure_url);
    setFile(response?.data?.secure_url);
  };

  console.log(auth?.currentUser?.email, 'usersssssssssssssssss');

  const addProduct = () => {
    if (!file) {
      alert('Please upload an Image!');
      return;
    }

    const user = auth?.currentUser;
    axios
      .post('http://127.0.0.1:1128/api/Product/createProduct', {
        ...inputs,
        imageURL: file,
        email: user?.email,
      })
      .then((response) => {
        console.log('Product added successfully', response?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  console.log(catregories);

  useEffect(() => {
    const categories = async () => {
      const response = await axios.get('http://127.0.0.1:1128/api/category/getAll');
      setCategories(response?.data);
    };

    categories();
  }, []);

  return (
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
          />
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={5}
            variant="outlined"
            name="description"
            onChange={handleInputChange}
          />
          <div className="img_upload">
            <input type="file" onChange={handleFileChange} />
            <img src={file} alt="" />
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
                  <MenuItem key={category?.id} value={category?.id}>{category?.name}</MenuItem>
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
            />
            <TextField
              id="outlined-basic"
              label="Dosage Form"
              variant="outlined"
              name="dosageForm"
              onChange={handleInputChange}
            />
            <TextField
              id="outlined-basic"
              label="Active Ingredients"
              variant="outlined"
              name="activeIngredients"
              onChange={handleInputChange}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label="Expiry Date"
                  style={{ width: '100%' }}
                  name='expiryDaate'
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
            />
            <TextField
              id="outlined-basic"
              label="Packaging"
              variant="outlined"
              name="packaging"
              style={{ width: '100%' }}
              onChange={handleInputChange}
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
            />
          </FormControl>
          <TextField
            id="outlined-basic"
            label="Quantity"
            name="stock"
            onChange={handleInputChange}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="Code bar"
            variant="outlined"
            name="codebar"
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="publish_button">
        <Button
          style={{ width: '10rem', backgroundColor: '#212B36' }}
          size="large"
          variant="contained"
          onClick={addProduct}
        >
          Create Product
        </Button>
      </div>
    </div>
  );
};

export default AddProduct;
