import axios from 'axios';
import { Tag } from 'antd';
import Barcode from 'react-barcode';
import React, { useState, useEffect } from 'react';

import './missingProd.css';

const MissingProd = () => {
  const [missing, setMissing] = useState([]);
  console.log(missing);
  // const codebar = 6194008533999;

  const fetchMissingProd = async () => {
    const response = await axios.get('http://127.0.0.1:1128/api/orders/getMissed');
    setMissing(response.data);
  };

  const auth = localStorage.getItem('userData')
  const parsing = JSON.parse(auth)
  console.log(parsing.data.email);
  const checkMissing = async (codebar, body, id, stock) => {
      const res = await axios.get(`http://127.0.0.1:1128/api/Product/checkOne/${parsing.data.email}/${codebar}`)
      console.log(res.data);
      if (res.data) {
        if (res.data.stock <= 0) {
          const create = await axios.post(`http://127.0.0.1:1128/api/Product/createProduct/${body}`)
          console.log(create);
        }
      }
      if (!res.data) {
        const update = await axios.patch(`http://127.0.0.1:1128/api/Product/updateProduct/${id}`, {stock})
        console.log(update);
      }
  }

  useEffect(() => {
    fetchMissingProd();
  }, []);

  return (
    <div
      style={{
        paddingRight: '2rem',
        paddingLeft: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: '',
      }}
    >
      <div style={{ height: 'auto', width: '100%' }}>
        <h2 style={{ fontSize: '2em' }}>Missing Products</h2>
        <div className="missing_productss">
          {missing.map((item) =>  (
              <div className="oneProduct" role="button" tabIndex="0" onClick={() => {checkMissing(item.codebar)}} onKeyPress={(e) => {if (e.key === 'Enter') { checkMissing(item.codebar); }}}>
                <div style={{ height: '50%', width: '100%', backgroundColor: 'black' }}>
                  <img src="" alt="" />
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '1rem',
                    }}
                  >
                    <p>{item?.productName}</p>
                    <Tag color="#f50">Missing</Tag>
                  </div>
                  <Barcode
                    value={item.codebar}
                    height={50}
                    width={1.5}
                    background="transparent"
                    format="CODE128"
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MissingProd;
