  import "./dataGrid.css";
  import * as React from "react";
  import { Link } from "react-router-dom";
  import { useEffect, useState } from "react";
  import Cards from "../cards/Cards";
  import Box from "@mui/material/Box";
  import { DataGrid } from "@mui/x-data-grid";
  import TextField from "@mui/material/TextField";
  import IconButton from "@mui/material/IconButton";
  import DeleteIcon from "@mui/icons-material/Delete";
  import EditIcon from "@mui/icons-material/Edit";
  import {
    SearchOutlined,
    UnorderedListOutlined,
    AppstoreOutlined,
    HeartOutlined,
    HeartFilled,
  } from "@ant-design/icons";
  import { Tag } from "antd";
  import { Timestamp } from "firebase/firestore";
  import axios from "axios";

  export default function DataGridDemo({ data }) {
    const [filteredRows, setFilteredRows] = useState(data);
    const [categoryNames, setCategoryNames] = useState({});
    const [toggle, setToggle] = useState(true);
    const [iconPress, setIconPress] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [imageSrc, setImageSrc] = useState(null);

    const columns = [
      {
        field: "productImage",
        headerName: "Product",
        width: 280,
        editable: false,
        renderCell: (params) => {
          const imageUrl = params.row.imageURL;
          const productName = params.row.productName;

          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={imageUrl} 
                alt={productName}
                style={{ width: 60, height: 40, objectFit: "contain" }}
              />
              <div style={{ marginLeft: "1rem" }}>{productName}</div>
            </div>
          );
        },
      },
      {
        field: "price",
        headerName: "Price",
        width: 150,
        editable: false,
        headerClassName: "custom-header-class",
      },
      {
        field: "CategoryId",
        headerName: "Categories",
        width: 200,
        editable: false,
        headerClassName: "custom-header-class",
      },
      {
        field: "stock",
        headerName: "Quantity",
        width: 150,
        editable: false,
        headerClassName: "custom-header-class",
      },
      {
        field: "codebar",
        headerName: "Code Bar",
        width: 150,
        editable: false,
        headerClassName: "custom-header-class",
      },
      {
        field: "createdAt",
        headerName: "Created At",
        width: 200,
        editable: false,
        headerClassName: "custom-header-class",
        valueGetter: (params) => {
          const timestamp = params.row.createdAt;
          return timestampToDate(timestamp);
        },
      },
      {
        field: "update",
        headerName: "Update",
        width: 90,
        editable: false,
        headerClassName: "custom-header-class",
        renderCell: () => (
          <IconButton variant="contained" color="primary" size="small">
            <EditIcon />
          </IconButton>
        ),
      },
      {
        field: "delete",
        headerName: "Delete",
        width: 90,
        editable: false,
        renderCell: (params) => (
          <IconButton
            variant="contained"
            color="error"
            size="small"
            onClick={() => {
              console.log(params.row.id);
              handleDelete(params.row.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        ),
      },
    ];
    console.log(data);

    function timestampToDate(timestamp) {
      const formattedDate = new Date(timestamp).toLocaleDateString();
      return `${formattedDate}`;
    }
    const handleDelete = (id) => {
      axios
        .delete(`http://127.0.0.1:1128/api/Product/deleteProduct/${id}`)
        .then((res) => {
          console.log(res);
          const updatedData = data.filter((item) => item.id !== id);
          setFilteredRows(updatedData);
        })
        .catch((err) => console.log(err));
    };

    useEffect(() => {
      // Update filteredRows whenever data changes
      setFilteredRows(data);
    }, [data]);

    console.log(filteredRows);
    return (
      <Box sx={{ height: 400, width: 1 }}>
        <div className="sidebar"></div>
        <div className="table-container">
          <div className="main_container_header">
            <div className="product_search">
              <div className="group">
                <SearchOutlined style={{ color: "#6e6e6e" }} />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button>Search</button>
            </div>
            <div className="icons_toggle">
              <UnorderedListOutlined
                onClick={() => setToggle(true)}
                className="iconBtn"
              />
              <AppstoreOutlined
                onClick={() => setToggle(false)}
                className="iconBtn"
              />
            </div>
          </div>
          <div className={`component ${toggle ? "visible" : "hidden"}`}>
            {toggle ? (
              <DataGrid
                rows={filteredRows}
                columns={columns}
                checkboxSelection
                disableRowSelectionOnClick
                sx={{
                  "&, [class^=MuiDataGrid]": {
                    border: "none",
                    borderRadius: "1rem",
                    gap: "0.6rem 0rem",
                  },
                  height: 560,
                  border: "none",
                  "[class^=MuiDataGrid-cellContent]": { borderRadius: "0" },
                }}
                getRowClassName={(params) => {
                  return params.row.image ? "image-row" : "";
                }}
                getRowHeight={() => 60}
              />
            ) : (
              <div className="products-cards">
                <div className="card_main_conatainer">
                  {filteredRows.map((item) => {
                    return (
                      <Cards
                        key={item.id}
                        categoryNames={categoryNames}
                        item={item}
                        iconPress={iconPress}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </Box>
    );
  }
