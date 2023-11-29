import React, { useEffect, useState } from "react";
import "./cardList.css";
import { DB } from "../../firebase-config";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import personalInfoIcon from "../../assets/images/personalInfoIcon.png";
import deliver2 from "../../assets/images/deliver2.png";
import axios from "axios"

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [name, setName] = useState("aymen");
  const [refresh, setRefresh] = useState(false);
  const [productData, setProductData] = useState([]);
  const [userName, setUserName] = useState("");

  // const productsCollectionRef = collection(DB,"orders")
 const fetchOrders = async ()=>{
    try {
        const data = await axios.get("/api/orders/getAll")
        setOrders(data.data)
    } catch (error) {
        throw new Error (error)
    }
 }
//   const q = query(
//     collection(DB, "orders"),
//     where("pharmacyId", "==", "fQ6ovqVAhufVHhrtOyKK")
//   );
//   const fetchOrderss = async () => {
//     try {
//       let list = [];
//       const querySnapshot = await getDocs(q);
//       querySnapshot.forEach((doc) => {
//         const data = doc.data();
//         const createdAtString = data.createdAt.toDate().toLocaleString();
//         const cancelledAtString = data.canceledAt.toDate().toLocaleString();
//         const delivredAtString = data.dilevredAt.toDate().toLocaleString();
//         const acceptedAtString = data.acceptedAt.toDate().toLocaleString();
//         list.push({
//           id: doc.id,
//           ...data,
//           createdAt: createdAtString,
//           canceledAt: cancelledAtString,
//           dilevredAt: delivredAtString,
//           acceptedAt: acceptedAtString,
//         });
//       });
//       setOrders(list);
//     } catch (error) {
//       console.log(error);
//     }
//   };
  

const handleCanceled = async (prodid, qOrder) => {
    try {
      await updateDoc(doc(DB, "products", prodid), {
        quantity: productData.quantity + qOrder,
      });
      setRefresh(!refresh);
    } catch (error) {
      console.log("error update", error);
    }
  };


  const handleCanceledOrder = async (id) => {
    try {
      const taskDocRef = doc(DB, "orders", id);
     const x = await updateDoc(taskDocRef, {
      canceledAt: serverTimestamp(),
      orderStatus: "canceled",
      });
      setRefresh(!refresh);
    } catch (error) {
      console.log("error update", error);
    }}
  
  // const handleCanceledOrder = async () => {
  //   try {
  //     const ordersQuery = query(
  //       collection(DB, "orders"),
  //       where("pharmacyId", "==", "fQ6ovqVAhufVHhrtOyKK")
  //     );

  //     const querySnapshot = await getDocs(ordersQuery);

  //     querySnapshot.forEach((docSnap) => {
  //       const docRef = doc(DB, "orders", docSnap.id);

  //       updateDoc(docRef, {
  //         canceledAt: serverTimestamp(),
  //         orderStatus: "canceled",
  //       });
  //     });

  //     setRefresh(!refresh);
  //   } catch (error) {
  //     console.error("Error updating the orders:", error);
  //   }
  // };
  const handleAcceptedOrder = async (id) => {
    try {
      const taskDocRef = doc(DB, "orders", id);
     const x = await updateDoc(taskDocRef, {
      acceptedAt: serverTimestamp(),
          orderStatus: "accepted",
      });
      setRefresh(!refresh);
    } catch (error) {
      console.log("error update", error);
    }}


  // const handleAcceptedOrder = async () => {
  //   try {
  //     const ordersQuery = query(
  //       collection(DB, "orders"),
  //       where("pharmacyId", "==", "fQ6ovqVAhufVHhrtOyKK")
  //     );

  //     const querySnapshot = await getDocs(ordersQuery);

  //     querySnapshot.forEach((docSnap) => {
  //       const docRef = doc(DB, "orders", docSnap.id);

  //       updateDoc(docRef, {
  //         acceptedAt: serverTimestamp(),
  //         orderStatus: "accepted",
  //       });
  //     });

  //     setRefresh(!refresh);
  //   } catch (error) {
  //     console.error("Error updating the orders:", error);
  //   }
  // };
  const handleDileveryOrder = async (id,status) => {
    try {
      const taskDocRef = doc(DB, "orders", id);
     const x = await updateDoc(taskDocRef, {
      dilevredAt: serverTimestamp(),
          livraisonStatus: status,
      });
      setRefresh(!refresh);
    } catch (error) {
      console.log("error update", error);
    }}
  // const handleDileveryOrderr = async (status) => {
  //   try {
  //     const ordersQuery = query(
  //       collection(DB, "orders"),
  //       where("pharmacyId", "==", "fQ6ovqVAhufVHhrtOyKK")
  //     );

  //     const querySnapshot = await getDocs(ordersQuery);

  //     querySnapshot.forEach((docSnap) => {
  //       const docRef = doc(DB, "orders", docSnap.id);

  //       updateDoc(docRef, {
  //         dilevredAt: serverTimestamp(),
  //         livraisonStatus: status,
  //       });
  //     });

  //     setRefresh(!refresh);
  //   } catch (error) {
  //     console.error("Error updating the orders:", error);
  //   }
  // };
  // const docRef = doc(DB, "products", productId);
  const getProdById = async (productId) => {
    try {
      const docSnap = await getDoc(doc(DB, "products", productId));
      const result = docSnap.data();
      setProductData(result);
    } catch (error) {
      console.log("error fetching prod", error);
    }
  };
  const getUserByid = async (userId) => {
    try {
      const docSnap = await getDoc(doc(DB, "users", userId));
      const result = docSnap.data();
      setUserName(result);
      return result;
    } catch (error) {
      console.log("error fetching prod", error);
    }
  };
  console.log(productData, "yesssss");

  useEffect(() => {
    fetchOrders();
  }, [refresh]);
  console.log(orders, "all orders");

  return (
    <div className="bigggg____divvv___order">
      <div className="big___big___con___ord">
      <div className="nested___divs___list___up">
        <div className="div1___nested___flex">Client</div>
        <div className="div2___nested___flex">Product</div>
        <div className="div3___nested___flex">Quantity</div>
        <div className="div4___nested___flex">created At</div>
        <div className="div5___nested___flex">Order Status</div>
        <div className="div6___nested___flex">Dilevery status </div>
        <div className="div7___nested___flex">Action</div>
      </div>
      </div>
      {orders.map((e) => {
        if (e.orderStatus === "pending") {
          return (
            <div
              className="nested___divs___list"
              onClick={() => getUserByid(e.usersId)}
            >
              <div className="div1___nested___flex">
                <div class="dropdown">
                  <img
                    className="imag___info___order"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    src={personalInfoIcon}
                    alt="Personal Info Icon"
                    onClick={() => getUserByid(e.usersId)}
                  />

                  <ul class="dropdown-menu">
                    <div className="info___cont___order___perso">
                      <img className="image___info___ord" />
                      <div>{userName.name}</div>
                      <div className="email___info___user___order">
                        {userName.email}
                      </div>
                      <div>{userName.number}</div>
                      <div>{userName.gender}</div>
                    </div>
                  </ul>
                </div>
              </div>

              {/* <div className="div1___nested___flex">{userName.name}</div> */}
              <div className="div2___nested___flex">{e.productsId[1]}</div>
              {/* <div className="div1___nested___flex">{productData.productName}</div> */}

              <div className="div3___nested___flex">{e.quantityOrdered}</div>
              <div className="div4___nested___flex">{e.createdAt}</div>
              {/* <div className="div4___nested___flex">{e.createdAt}</div> */}
              <div className="div5___nested___flex">
                <span class="badge rounded-pill text-bg-warning">Pending</span>
              </div>
              <div className="div6___nested___flex">
                <span class="badge rounded-pill text-bg-warning">Pending</span>
              </div>

              <div className="edit___order___reject">
                
                <button
                  className="btn___cnfrm___order___modal"
                  // type="button"
                  data-bs-toggle="modal"
                  data-bs-target={`#${e.id}accept`}
                  onClick={() => getProdById(e.productsId[0])}
                >
                  Accept
                </button>
                <div
                  class="modal fade"
                  id={`${e.id}accept`}
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="acceptedModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="acceptedModalLabel">
                          Acceptation of order
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <div>Are you sure to accept the commande ?</div>
                        <div>Medicine: {productData.productName}</div>
                        <div>Quantity: {e.quantityOrdered}</div>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          class="btn btn-primary"
                          data-bs-dismiss="modal"
                          onClick={() => handleAcceptedOrder(e.id)}
                        >
                          Confirme
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    className="btn___cnfrm___order___modal___canc"
                    type="button"
                    // class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target={`#${e.id}reject`}
                    onClick={() => getProdById(e.productsId[0])}
                  >
                    Reject
                  </button>
                  {/* <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#canceledModal"
                    onClick={() => getProdById(e.productsId[0])}
                  >
                    Reject
                  </button> */}
                  <div
                    class="modal fade"
                    id={`${e.id}reject`}
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabindex="-1"
                    aria-labelledby="canceledModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="canceledModalLabel">
                            Reject of order
                          </h5>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body">
                          <div>Are you sure to reject this order ?</div>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={() => {
                              handleCanceled(
                                e.productsId[0],
                                e.quantityOrdered
                              );
                              handleCanceledOrder(e.id);
                              setRefresh(!refresh);
                            }}
                          >
                            Confirme
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        if (e.orderStatus === "accepted" && e.livraisonStatus !== "delivred") {
          return (
            <div
              className="nested___divs___list"
              onClick={() => getUserByid(e.usersId)}
            >
              <div className="div1___nested___flex">
                <div class="dropdown">
                  <img
                    className="imag___info___order"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    src={personalInfoIcon}
                    alt="Personal Info Icon"
                    onClick={() => getUserByid(e.usersId)}
                  />

                  <ul class="dropdown-menu">
                    <div className="info___cont___order___perso">
                      <img className="image___info___ord" />
                      <div>{userName.name}</div>
                      <div className="email___info___user___order">
                        {userName.email}
                      </div>
                      <div>{userName.number}</div>
                      <div>{userName.gender}</div>
                    </div>
                  </ul>
                </div>
              </div>
              {/* <div className="div1___nested___flex">{userName.name}</div> */}
              <div className="div2___nested___flex">{e.productsId[1]}</div>
              <div className="div3___nested___flex">{e.quantityOrdered}</div>
              <div className="div4___nested___flex">{e.createdAt}</div>
              <div className="div5___nested___flex">
                <span class="badge rounded-pill text-bg-success">
                  Confirmed
                </span>
                {e.acceptedAt}
              </div>
              {e.livraisonStatus === "pending" ? (
                <div className="div6___nested___flex">
                  <span class="badge rounded-pill text-bg-warning">
                    Pending
                  </span>
                </div>
              ) : (
                <div className="div6___nested___flex">
                  <span class="badge rounded-pill text-bg-warning">
                    In Transit
                  </span>
                </div>
              )}

              <div className="edit___order___reject">
                <div
                className="btn___cnfrm___order___modal___dilevry"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                >Dilevery</div>
                {/* <img
                  className="imag___dilevery___order"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  src={deliver2}
                  alt="Personal Info Icon"
                /> */}
                <div class="dropdown">
                  <ul class="dropdown-menu">
                    <li onClick={() => handleDileveryOrder(e.id,"pending")}>
                      <a class="dropdown-item" href="#">
                        Pending
                      </a>
                    </li>
                    <li onClick={() => handleDileveryOrder(e.id,"inTransit")}>
                      <a class="dropdown-item" href="#">
                        In Transit
                      </a>
                    </li>
                    <li onClick={() => handleDileveryOrder(e.id,"delivred")}>
                      <a class="dropdown-item" href="#">
                        Delivered
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <button
                    type="button"
                    className="btn___cnfrm___order___modal___canc"
                    data-bs-toggle="modal"
                    data-bs-target="#canceledModal"
                    onClick={() => getProdById(e.productsId[0])}
                  >
                    Reject
                  </button>
                  <div
                    class="modal fade"
                    id="canceledModal"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabindex="-1"
                    aria-labelledby="canceledModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="canceledModalLabel">
                            Modal title
                          </h5>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body">
                          <input placeholder="Write here" />
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={() => {
                              handleCanceled(
                                e.productsId[0],
                                e.quantityOrdered
                              );
                              handleCanceledOrder(e.id);
                            }}
                          >
                            Confirme
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        if (e.orderStatus === "accepted" && e.livraisonStatus === "delivred") {
          return (
            <div
              className="nested___divs___list"
              onClick={() => getUserByid(e.usersId)}
            >
              <div className="div1___nested___flex">
                <div class="dropdown">
                  <img
                    className="imag___info___order"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    src={personalInfoIcon}
                    alt="Personal Info Icon"
                    onClick={() => getUserByid(e.usersId)}
                  />

                  <ul class="dropdown-menu">
                    <div className="info___cont___order___perso">
                      <img className="image___info___ord" />
                      <div>{userName.name}</div>
                      <div className="email___info___user___order">
                        {userName.email}
                      </div>
                      <div>{userName.number}</div>
                      <div>{userName.gender}</div>
                    </div>
                  </ul>
                </div>
              </div>
              {/* <div className="div1___nested___flex">{userName.name}</div> */}
              <div className="div2___nested___flex">{e.productsId[1]}</div>
              <div className="div3___nested___flex">{e.quantityOrdered}</div>
              <div className="div4___nested___flex">{e.createdAt}</div>
              <div className="div5___nested___flex">
                <span class="badge rounded-pill text-bg-success">
                  Confirmed
                </span>
                {e.acceptedAt}
              </div>
              <div className="div5___nested___flex">
                <span class="badge rounded-pill text-bg-primary">Delivred</span>
                {e.dilevredAt}
              </div>
            </div>
            
          );
        }
        if (e.orderStatus === "canceled") {
          return (
            <div
              className="nested___divs___list"
              onClick={() => getUserByid(e.usersId)}
            >
              <div className="div1___nested___flex">
                <div class="dropdown">
                  <img
                    className="imag___info___order"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    src={personalInfoIcon}
                    alt="Personal Info Icon"
                    onClick={() => getUserByid(e.usersId)}
                  />

                  <ul class="dropdown-menu">
                    <div className="info___cont___order___perso">
                      <img className="image___info___ord" />
                      <div>{userName.name}</div>
                      <div className="email___info___user___order">
                        {userName.email}
                      </div>
                      <div>{userName.number}</div>
                      <div>{userName.gender}</div>
                    </div>
                  </ul>
                </div>
              </div>
              {/* <div className="div1___nested___flex">{userName.name}</div> */}
              <div className="div2___nested___flex">{e.productsId[1]}</div>
              <div className="div3___nested___flex">{e.quantityOrdered}</div>
              <div className="div4___nested___flex">{e.createdAt}</div>
              <div className="div5___nested___flex">
                <span class="badge rounded-pill text-bg-danger">Canceled</span>
                {e.canceledAt}
              </div>
              <div className="div5___nested___flex">
                <span class="badge rounded-pill text-bg-warning">
                  Not-Delevred
                </span>
              </div>
            </div>
          );
        }
      })}
    </div>
  );

  // if (name === "ali") {
  //   return (
  //     <div className="nested___divs___list">
  //       <div className="div1___nested___flex">client Name</div>
  //       <div className="div2___nested___flex">product</div>
  //       <div className="div3___nested___flex">quantity</div>
  //       <div className="div4___nested___flex">created At</div>
  //       <div className="div5___nested___flex">Accepted At</div>
  //       <div className="div6___nested___flex">Dilevred At</div>
  //       <div className="div7___nested___flex">Action</div>
  //     </div>
  //   );
  // }

  // return (
  //   <div>
  //     <div className="container___order___card">
  //       <div className="nested___divs___list">
  //         <div className="div1___nested___flex">client Name</div>
  //         <div className="div2___nested___flex">product</div>
  //         <div className="div3___nested___flex">quantity</div>
  //         <div className="div4___nested___flex">created At</div>
  //         <div className="div5___nested___flex">Accepted At</div>
  //         <div className="div6___nested___flex">Dilevred At</div>
  //         <div className="div7___nested___flex">Action</div>
  //       </div>
  //       <div className="nested___divs___list">
  //         <div className="div1___nested___flex">client Name</div>
  //         <div className="div2___nested___flex">product</div>
  //         <div className="div3___nested___flex">quantity</div>
  //         <div className="div4___nested___flex">created At</div>
  //         <div className="div5___nested___flex">Accepted At</div>
  //         <div className="div6___nested___flex">Dilevred At</div>
  //         <div className="div7___nested___flex">Action
  //         <button>accept</button>
  //         <button>sended</button>
  //         <button>on route</button>
  //         <button>dilevred</button>
  //         <button>delete</button>
  //         </div>
  //       </div>

  //     </div>
  //   </div>
  // );
};

export default OrderList;
