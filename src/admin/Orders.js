import React, { useState, useEffect, Fragment } from "react";
import Menu from "../core/Menu";
import { isAuth } from "../helper";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";
import moment from "moment";
import localization from "moment/locale/id";
import Report from "./Report";
moment.updateLocale("id", localization);

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);

  const { _id, token } = isAuth();

  const loadOrders = () => {
    listOrders(_id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const loadStatusValues = () => {
    getStatusValues(_id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);

  const showOrdersLength = () => {
    if (orders.length > 0) {
      return (
        <h1 className="text-danger display-2">Total orders: {orders.length}</h1>
      );
    } else {
      return <h1 className="text-danger">No orders</h1>;
    }
  };

  const showInput = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
      </div>
      <input type="text" value={value} className="form-control" readOnly />
    </div>
  );

  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(_id, token, orderId, e.target.value).then((data) => {
      if (data.error) {
        console.log("Status update failed");
      } else {
        loadOrders();
      }
    });
  };

  const showStatus = (o) => (
    <div className="form-group">
      <h3 className="mark mb-4">Status: {o.status}</h3>
      <select
        className="form-control"
        onChange={(e) => handleStatusChange(e, o._id)}
      >
        <option>Update Status</option>
        {statusValues.map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <Menu>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showOrdersLength()}
          {/* {show && (
            
          )} */}

          {orders.map((o, oIndex) => {
            return (
              <Fragment key={oIndex}>
                {/* <Report /> */}
                {/* <PDFDownloadLink
                  document={<PdfDocument />}
                  fileName="report.pdf"
                  style={{
                    textDecoration: "none",
                    padding: "10px",
                    color: "#4a4a4a",
                    backgroundColor: "#f2f2f2",
                    border: "1px solid #4a4a4a",
                  }}
                >
                  {({ blob, url, loading, error }) =>
                    loading ? "Loading document..." : "Download Pdf"
                  }
                  <PdfDocument />
                </PDFDownloadLink> */}
                <Report />
                <div
                  className="mt-5"
                  style={{ borderBottom: "5px solid indigo" }}
                >
                  <h2 className="mb-5">
                    <span className="bg-primary">Order ID: {o._id}</span>
                  </h2>

                  <ul className="list-group mb-2">
                    <li className="list-group-item">{showStatus(o)}</li>
                    <li className="list-group-item">
                      Transaction ID: {o.transaction_id}
                    </li>
                    <li className="list-group-item">Harga: Rp. {o.amount}</li>
                    <li className="list-group-item">
                      Ordered by: {o.user.name}
                    </li>
                    <li className="list-group-item">
                      Ordered on: {moment(o.createdAt).fromNow()}
                    </li>
                    <li className="list-group-item">
                      Delivery address: {o.address}
                    </li>
                  </ul>

                  <h3 className="mt-4 mb-4 font-italic">
                    Total products in the order: {o.products.length}
                  </h3>

                  {o.products.map((p, pIndex) => (
                    <div
                      className="mb-4"
                      key={pIndex}
                      style={{
                        padding: "20px",
                        border: "1px solid indigo",
                      }}
                    >
                      {showInput("Product name", p.name)}
                      {showInput("Product price", p.price)}
                      {showInput("Product total", p.count)}
                      {showInput("Product Id", p._id)}
                    </div>
                  ))}
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </Menu>
  );
};

export default Orders;
