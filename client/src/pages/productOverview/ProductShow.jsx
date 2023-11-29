// import React,{useEffect,useState} from 'react'
// import "./style.css"
// import { DB } from "../../firebase-config";
// import { collection, getDocs, doc } from "firebase/firestore";


// const ProductShow = () => {
//     const [products,setPrducts]=useState([])
//     const productsCollectionRef = collection(DB,"products")
//     const getProducts = async ()=>{
//         try {
//             const result = await getDocs (productsCollectionRef)
//             const products = result.docs.map((doc)=>({
//                 ...doc.data(),
//                 id : doc.id
//             }))
//             setPrducts(products)
//         } catch (error) {
//             console.log("error fetching data",error)
//         }
//       }
//       useEffect(()=>{
//           getProducts()
//       },[])
//   return (
//     <div>
//         <div className="all___suggested___cards">
//         <div className="card___suggested___container">
//           <div className="card___image___suggestion">
//             <img src="" alt="" />
//           </div>
//           <div className="text___product___suggestion">
//             <h1 className="product___title___suggestion">Product Name</h1>
//             <div className="keys___description___suggestion">
//               <div className="oneKey___description___suggestion">
//                 <div className="icon___product___keySuggestion">AA</div>
//                 <p className="text___product___keySuggestion">Quantity</p>
//               </div>
//               <div className="oneKey___description___suggestion">
//                 <div className="icon___product___keySuggestion">AA</div>
//                 <p className="text___product___keySuggestion">Quantity</p>
//               </div>
//               <div className="oneKey___description___suggestion">
//                 <div className="icon___product___keySuggestion">AA</div>
//                 <p className="text___product___keySuggestion">Quantity</p>
//               </div>
//               <p className="under___description___suggest">
//                 Description of this products
//               </p>
//             </div>
//             <button className="show___product___suggestion___btn">
//               Show Product
//             </button>
//           </div>
//         </div>
     
//       </div>
//     </div>
//   )
// }

// export default ProductShow
import React, { useState, useEffect } from "react";
import "./style.css";
import SideNav from "../../components/sideNav/SideNav";
import DataGrid from "../../components/dataGrid/dataGrid";
import { collection, getDocs } from "firebase/firestore";
import { DB } from "../../firebase-config";
import { Timestamp } from "firebase/firestore";
import { useNavigate } from 'react-router';
import ProductDetails from "../productDetails/ProductDetails";
import { useDispatch } from 'react-redux';
import { save } from '../../redux/productSlicer';

const ProductOverview = () => {
  const [data, setData] = useState([]);
  const [prodId,setPredId]=useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleShowProductDetails = (e) => {
    dispatch(save(e));
  };

  function timestampToDate(timestamp) {
    if (timestamp instanceof Timestamp) {
      const date = timestamp.toDate();
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear().toString().slice(-2);
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");

      return `${day}/${month}/${year} ${hours}:${minutes}`;
    }
    return null;
  }

  const fetchData = async () => {
    try {
      let list = [];
      const querySnapshot = await getDocs(collection(DB, "products"));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.timeStamp = timestampToDate(data.timeStamp);
        list.push({ id: doc.id, ...data });
      });
      setData(list);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    localStorage.setItem("prod_id",prodId )
  }, [prodId]);
  console.log(data);
  console.log(prodId,"this");

  return (
    <div className="all_product_container">
      <SideNav />
      <div className="body_cards_container">
        {/* <DataGrid data={data} /> */}
        {data.map((e)=>(
          <div className="all___suggested___cards">
          <div className="card___suggested___container">
            <div className="card___image___suggestion">
              <img src="" alt="" />
            </div>
            <div className="text___product___suggestion">
              <h1 className="product___title___suggestion">{e.productName}</h1>
              <div className="keys___description___suggestion">
                <div className="oneKey___description___suggestion">
                  <div className="icon___product___keySuggestion">AA</div>
                  <p className="text___product___keySuggestion">{e.productPrice}</p>
                </div>
                <div className="oneKey___description___suggestion">
                  <div className="icon___product___keySuggestion">AA</div>
                  <p className="text___product___keySuggestion">Quantity</p>
                </div>
                <div className="oneKey___description___suggestion">
                  <div className="icon___product___keySuggestion">AA</div>
                  <p className="text___product___keySuggestion">Quantity</p>
                </div>
                <p className="under___description___suggest">
                  Description of this products
                </p>
              </div>
              <button className="show___product___suggestion___btn" onClick={()=>{navigate("/product-details");setPredId(e.id);console.log(e.id,"ffffff");handleShowProductDetails(e.id);    localStorage.setItem("prod_id",prodId )
}}> 
                Show Product
              </button>
            </div>
          </div>
       
        </div>
        ))}
      </div>
    </div>
  );
};

export default ProductOverview;
