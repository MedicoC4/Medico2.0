import React, { useState } from 'react';
import { Image, Space, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import './productDetails.css';

const items = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: '0',
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: '3rd menu item',
    key: '3',
  },
];

function ProductDetails() {
  const [inc, setInc] = useState(0);

  const increment = () => {
    setInc((prevInc) => prevInc + 1);
  };

  const decrement = () => {
    if (inc > 1) {
      setInc((prevInc) => prevInc - 1);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '2rem',
        gap:'2rem',
        width:'100%'
      }}
    >
      <div className="productDetail_header">
        <div style={{ zIndex: '0', width: '80%' }}>
          <Image
            style={{ borderRadius: '18px' }}
            src="https://swiperjs.com/demos/images/nature-1.jpg"
          />
        </div>
        <div style={{display:"flex", flexDirection:'column', gap:'2rem'}}>
          <div style={{display:"flex", flexDirection:'column', gap:'1.1rem', justifyContent:'flex-start'}}>
            <p className="new_tag">NEW</p>
            <p className="stocksss">IN STOCK</p>
            <h5 className="foundations">Foundations Matte Flip Flop</h5>
            <div>starts(aeereaaon)</div>
            <p>$97.14</p>
            <p className="descss">
              Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air
              Max 97 lets you push your style full-speed ahead.
            </p>
          </div>
          <div style={{display:"flex", flexDirection:'column', gap:'1rem'}}>
            <div className="dosage">
              <p>Dosage Form</p>
              <Dropdown
                menu={{
                  items,
                }}
                trigger={['click']}
              >
                <a
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <Space>
                    Click me
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
            <div className="quantity">
              <p>Quantity</p>
              <div>
                <button type="button" onClick={decrement}>-</button>
                <p>{inc}</p>
                <button type="button" onClick={increment}>+</button>
              </div>
            </div>
            <div className="butttonss">
              <div>
                <p>Add to Cart</p>
              </div>
              <div>
                <p>Buy Now</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{width:'100%'}}>
        <h1>Product Description</h1>
        <div className='specc_container'>
          <h2>Specifications</h2>
          <div className='specificationss'>
            <p>Category</p>
            <p>Shoes</p>
            <p>Manufacturer</p>
            <p>Nike</p>
            <p>Serial Number</p>
            <p>358607726380311</p>
            <p>Ships From</p>
            <p>United States</p>
          </div>
          <h2>Product Details</h2>
          <ul>
            <li>Product Details</li>
            <li>Product Details</li>
            <li>Product Details</li>
            <li>Product Details</li>
            <li>Product Details</li>
          </ul>
          <h2>Benefits</h2>
          <ul>
            <li>Benefits</li>
            <li>Benefits</li>
            <li>Benefits</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
