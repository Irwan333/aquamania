import React, { useState, useEffect } from "react";
import Menu from "../core/Menu";
import { getProducts } from "./apiProduct";
import Card from "./Card";
import Search from "./Search";
import { Shop } from "../core/landing";
import { isAuth } from "../helper";

const Sell = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Menu>
      {!isAuth() && <Shop />}
      <div className="container" id="shop">
        <Search />
        <h2 className="mb-4">Baru</h2>
        <div className="row row-eq-height">
          {productsByArrival.map((product, i) => (
            <div key={i} className="col-4 mb-4">
              <Card product={product} />
            </div>
          ))}
        </div>

        <h2 className="mb-4">Penjualan terbaik</h2>
        <div className="row">
          {productsBySell.map((product, i) => (
            <div key={i} className="col-4 mb-3">
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    </Menu>
  );
};

export default Sell;
