import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tag } from "antd";
import {
  SearchOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";

const Cards = ({ item, categoryNames }) => {
  console.log(categoryNames);

  const [iconPress, setIconPress] = useState(true);

  // const categoryName = categoryNames[item.productCategory.id] || "Loading...";

  return (
    <div className="med_card">
      <div className="card_header">
        <div className="img">
          <img src={item.imgUrl} alt="" />
        </div>
        {iconPress ? (
          <div className="icon" onClick={() => setIconPress(!iconPress)}>
            <HeartOutlined className="icon_ant" />
          </div>
        ) : (
          <div className="icon" onClick={() => setIconPress(!iconPress)}>
            <HeartFilled className="icon_ant" />
          </div>
        )}
      </div>
      <div className="card_container">
        <p>{item.productName}</p>
        <div className="category_badge">
          <Tag className="ant-tag" color="#F3F7FB" style={{ color: "#24aeb1" }}>
            categoryName
          </Tag>
        </div>
        <p>{item.productDescription}</p>
        <p>{item.productPrice}</p>
      </div>
      <div className="card_footer">
        <Link className="button" to={`/product-detail/${item.id}`}>
          see product
        </Link>
      </div>
    </div>
  );
};

export default Cards;
