import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from 'firebase/firestore';
import { DB } from "../../firebase-config"; // Import your Firebase configuration

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productDocRef = doc(DB, 'products', productId); // Replace 'products' with the name of your collection
        const productDocSnapshot = await getDoc(productDocRef);

        if (productDocSnapshot.exists()) {
          setProduct(productDocSnapshot.data());
        } else {
          // Handle the case where the product doesn't exist
          console.error('Product not found');
        }

        setLoading(false);
      } catch (error) {
        // Handle any errors that occur during the fetch
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  console.log(product);

  return (
    <div className="container">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-12 mb-4">
                {product && (
                  <img
                    alt=""
                    className="img-thumbnail p-0 border-0"
                    src={product.imgUrl}
                  />
                )}
              </div>
              <div className="col-md-3 mb-4">
                {product && (
                  <img
                    alt=""
                    className="img-thumbnail p-0 border-0"
                    src={product.imgUrl}
                  />
                )}
              </div>
              <div className="col-md-3 mb-4">
                {product && (
                  <img
                    alt=""
                    className="img-thumbnail p-0 border-0"
                    src={product.imgUrl}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                {product && (
                  <h1>{product.productName}</h1>
                )}
                {product && (
                  <p className="m-0">
                    <i className="fas fa-star fa-sm"></i>
                    {/* Star icons */}
                  </p>
                )}
                <ul className="list-group list-group-flush mb-4">
                  {product && (
                    <li className="list-group-item pl-0 pr-0 pt-2 pb-2">
                      Reward Points: {product.rewardPoints}
                    </li>
                  )}
                  {product && (
                    <li className="list-group-item pl-0 pr-0 pt-2 pb-2">
                      Availability: {product.availability}
                    </li>
                  )}
                  {product && (
                    <li className="list-group-item pl-0 pr-0 pt-2 pb-2">
                      Price in reward points: {product.priceInRewardPoints}
                    </li>
                  )}
                  {product && (
                    <li className="list-group-item pl-0 pr-0">
                      <p className="m-0 h2">
                        {product.productPrice}$
                      </p>
                      {product && (
                        <p className="m-0 text-muted">Ex Tax: {product.exTax}</p>
                      )}
                    </li>
                  )}
                  {product && (
                    <li className="list-group-item pl-0 pr-0 pt-2 pb-2">
                      Market Price: {product.marketPrice}
                    </li>
                  )}
                  {product && (
                    <li className="list-group-item pl-0 pr-0 pt-2 pb-2">
                      List Price: {product.listPrice}
                    </li>
                  )}
                  {product && (
                    <li className="list-group-item pl-0 pr-0 pt-2 pb-2">
                      Cost Price: {product.costPrice}
                    </li>
                  )}
                  {product && (
                    <li className="list-group-item pl-0 pr-0 pt-2 pb-2">
                      Wholesale Price: {product.wholesalePrice}
                    </li>
                  )}
                </ul>
                <div className="input-group input-group-lg mb-4">
                  <input
                    type="number"
                    className="form-control text-center"
                    placeholder="Quantity"
                    id="quantity"
                    name="quantity"
                    value="1"
                    min="1"
                    max="5"
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">Quantity</span>
                  </div>
                </div>
                {product && (
                  <div className="btn-group btn-group-lg" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-secondary">
                      <i className="fas fa-cart-plus"></i>
                      <span>Add Cart</span>
                    </button>
                    <button type="button" className="btn btn-secondary">
                      <i className="fas fa-shopping-cart"></i>
                    </button>
                    <button type="button" className="btn btn-secondary">
                      <i className="fas fa-heart"></i>
                    </button>
                    <button type="button" className="btn btn-secondary">
                      <i className="fas fa-exchange-alt"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
