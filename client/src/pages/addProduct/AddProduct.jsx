import React, { useEffect, useState } from "react";
import "./addProduct.css";
import { auth } from "../../firebase-config";
import SideNav from "../../components/sideNav/SideNav";
import {
  addDoc,
  getDocs,
  collection,
  serverTimestamp,
  doc,
} from "firebase/firestore";
import { DB, storage } from "../../firebase-config";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  DocumentReference,
} from "firebase/storage";
import ImgUpload from "../../components/img/ImgUpload";
import { notification } from "antd";
import axios from "axios";
import useForm from "../../hooks/useForm";
import validate from "../../utils/validate";
import Input from "../../components/Input/Input";
import { useUserData } from "../../context/UserDataContext.js";

const initialState = {
  name: {
    value: "",
    required: true,
  },
  email: {
    value: "",
    required: true,
    requiredMessage: "Email address is required!",
    email: true,
    emailMessage: "Email address is not valid!",
  },
  password: {
    value: "",
    required: true,
    minLength: 6,
    minLengthMessage: "Password must be at least 6 characters long!",
    maxLength: 16,
    maxLengthMessage: "Too many characters!",
  },
  confirmPassword: {
    value: "",
    required: true,
    matchWith: "password",
    matchWithMessage: "Password values must be equal!",
  },
  gender: {
    value: "",
    required: true,
  },
  difficulty: {
    value: "",
    required: true,
  },
  image: {
    value: "",
    required: true,
    file: true,
    allowedTypes: ["jpg", "jpeg", "png", "gif"],
    maxFileSize: 1024,
  },
  description: {
    value: "",
  },
  terms: {
    value: false,
    required: true,
    requiredMessage: "You need to accept our Terms and Conditions!",
  },
};

const AddProduct = () => {
  const { userData, updateUserData } = useUserData();
  const [catregories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  console.log(selectedCategory);

  console.log(userData);

  const [inputs, setInputs] = useState({
    productName: "",
    price: "",
    stock: "",
    description: "",
    manufacturer: "",
    activeIngredients: "",
    dosageForm: "",
    strength: "",
    packaging: "",
    expiryDate: "",
    imageURL:
      "https://www.parafendri.tn/2330-medium_default/svr-sun-secure-blur-creme-mousse-spf50.jpg",
    sideEffect: "",
    codebar: "",
    PharmacyId: userData.Pharmacy.id,
    CategoryId: "",
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
    console.log("hello",selectedFile);
    const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", "qyrzp0xv");
        const response = await axios.post('https://api.cloudinary.com/v1_1/dp42uyqn5/upload',formData);
        console.log(response.data.secure_url);
          setFile(response.data.secure_url)
  };

  console.log(auth.currentUser.email, "usersssssssssssssssss");

  const addProduct = () => {
    if (!file) {
      alert("Please upload an Image!");
      return;
    }

    const user = auth.currentUser;
    axios
      .post("http://127.0.0.1:1128/api/Product/createProduct", {
        ...inputs,
        imageURL:file,
        email: user.email,
      })
      .then((response) => {
        console.log("Product added successfully", response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const categories = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:1128/api/Categories/getAll"
      );
      setCategories(response.data);
    } catch (error) {
      throw error;
    }
  };

  console.log(catregories);

  useEffect(() => {
    categories();
  }, []);

  

  return (
    <div className="holy-container">
      {/* {contextHolder} */}
      <div className="side">
        <SideNav />
      </div>
      <div className="biggest_container_ever">
        <div className="left_div_add_details">
          <h1>Add Products</h1>
          <div className="product_information_add">
            <p className="addproduct_title">Product Information</p>
            <div className="addproduct_input_div">
              <p className="input_title_add">Product Name</p>
              <input
                type="text"
                placeholder="Enter product name"
                className="big_add_inputs"
                name="productName"
                // value={formData.productName}
                onChange={handleInputChange}
              />
            </div>
            <div className="addproduct_input_div">
              <p className="input_title_add">Product Description</p>
              <input
                type="text"
                placeholder="Enter a brief description"
                className="big_add_inputs"
                name="productDescription"
                // value={formData.productDescription}
                onChange={handleInputChange}
              />
            </div>
            <div className="add_side_effects">
              <div className="side_effects_inputs">
                <div className="addproduct_input_div">
                  <p className="input_title_add">Manufacturer</p>
                  <input
                    type="text"
                    placeholder="Enter Manufacturer Name"
                    className="big_add_inputs"
                    name="manufacturer"
                    // value={formData.productDescription}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="addproduct_input_div">
                  <p className="input_title_add">Packaging</p>
                  <input
                    type="text"
                    placeholder="Enter Packaging Type"
                    className="big_add_inputs"
                    name="packaging"
                    // value={formData.productDescription}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="addproduct_input_div">
                  <p className="input_title_add">Active Ingredients</p>
                  <input
                    type="text"
                    placeholder="Enter Active Ingredients"
                    className="big_add_inputs"
                    name="activeIngredients"
                    // value={formData.productDescription}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="addproduct_input_div">
                  <p className="input_title_add">Expiry Date</p>
                  <input
                    type="date"
                    placeholder="Enter Expiry Date"
                    className="big_add_inputs"
                    name="expiryDate"
                    // value={formData.productDescription}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="product_information_add">
            <p className="addproduct_title">Add Product Image</p>
            <div className="image_container_and_title">
              <div className="white_image_holder">
                <div>
                  <input type="file" onChange={handleFileChange} id="" />
                  {/* <ImgUpload file={file} FileAdd={handleFileChange} /> */}
                </div>
              </div>
            </div>
          </div>
          <div className="product_information_add">
            <div className="add_side_effects">
              <div className="side_effects_inputs">
                <div className="addproduct_input_div">
                  <p className="input_title_add">Price</p>
                  <input
                    type="text"
                    placeholder="Enter Price"
                    className="big_add_inputs"
                    name="price"
                    // value={formData.productDescription}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="addproduct_input_div">
                  <p className="input_title_add">Stock</p>
                  <input
                    type="text"
                    placeholder="Enter Stock"
                    className="big_add_inputs"
                    name="stock"
                    // value={formData.productDescription}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="addproduct_input_div">
                  <p className="input_title_add">Strength</p>
                  <input
                    type="text"
                    placeholder="Enter Strength"
                    className="big_add_inputs"
                    name="strength"
                    // value={formData.productDescription}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="addproduct_input_div">
                  <p className="input_title_add">Codebar</p>
                  <input
                    type="text"
                    placeholder="Enter The Codebar"
                    className="big_add_inputs"
                    name="codebar"
                    // value={formData.productDescription}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="addproduct_input_div">
            <p className="input_title_add">Dosage Form</p>
            <input
              type="text"
              placeholder="Enter Dosage Form"
              className="big_add_inputs"
              name="dosageForm"
              // value={formData.productDescription}
              onChange={handleInputChange}
            />
          </div>
          <div className="addproduct_input_div">
            <p className="input_title_add">Category</p>
            <select
              id="category"
              className="big_add_inputs"
              name="CategoryId"
              value={inputs.CategoryId}
              onChange={handleInputChange}
            >
              <option value="">Select a category</option>
              {catregories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="right_div_add_details" style={{ marginTop: "5.85rem" }}>
          <div className="product_information_add">
            <div className="top_preview_add_image">
              <p className="addproduct_title">Product Preview</p>
              <i className="material-icons">&#xe5d0;</i>
            </div>
            <img src="" alt="" className="image_preview_holder" />
            <div className="bottom_preview_add_image">
              <p className="addproduct_title">Article Details</p>
              <button type="button" className="save_draft_image">
                Save
              </button>
            </div>
          </div>
          <div className="product_information_add">
            <div className="buttons_save_add_collection">
              <button
                onClick={addProduct}
                // disabled={perc !== null && perc < 100}
                className="saving_buttons_add"
                // onClick={handleSubmit}
              >
                Publish
              </button>
              <button className="saving_buttons_add">Schedule</button>
              <p className="addproduct_title" id="belong_to_buttons">
                Save Draft
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
