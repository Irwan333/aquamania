import React, { useState, useEffect, Fragment } from "react";
import { isAuth } from "../helper";
import Menu from "../core/Menu";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./ApiUser";
import moment from "moment";

const Dashboard = () => {
  const [history, setHistory] = useState([]);

  const { _id, name, email, role } = isAuth();
  const token = isAuth().token;

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
  }, [_id, token]);

  const userInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">
            {role === 1 ? "Admin" : "Registered User"}
          </li>
        </ul>
      </div>
    );
  };

  const purchaseHistory = (history) => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Purchase history</h3>
        <ul className="list-group">
          <li className="list-group-item">
            {history.map((h, y) => {
              return (
                <Fragment key={y}>
                  <hr />
                  {h.products.map((p, i) => {
                    return (
                      <div key={i}>
                        <h6>Nama produk: {p.name}</h6>
                        <h6>Harga produk: Rp. {p.price}</h6>
                        <h6>Jumlah beli: {p.count}</h6>
                      </div>
                    );
                  })}
                  <h6>Tanggal pembelian: {moment(h.createdAt).fromNow()}</h6>
                  <h6>Total harga: Rp. {h.amount}</h6>
                  <Link
                    to={`/invoice/${h._id}`}
                    className="btn btn-raised btn-primary"
                  >
                    Lihat Faktur
                  </Link>
                </Fragment>
              );
            })}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Menu>
      <div className="row">
        {/* <div className="col-3">{userLinks()}</div> */}
        <div className="col-9">
          {userInfo()}
          {purchaseHistory(history)}
        </div>
      </div>
    </Menu>
  );
};

export default Dashboard;
