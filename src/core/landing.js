import React from "react";
import landing from "../assets/style/Landing.module.css";
import { Link } from "react-router-dom";

export const Shop = () => {
  return (
    <header id="header" className={landing.header}>
      <div className={landing.headercontent}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className={landing.textcontainer}>
                <h1>
                  <span className={landing.turquoise}>StartUp Landing</span>{" "}
                  Page Template Free
                </h1>
                <p className={landing.plarge}>
                  Cari dan temukan berbagai macam ikan hias dan dekorasi
                  aquascape yang menarik
                </p>
                <Link className={landing.btnsolidlg} to="#shop">
                  DISCOVER
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className={landing.imagecontainer}>
                <img
                  className="img-fluid"
                  src={require("../assets/img/add-to-cart.svg")}
                  alt="alternative"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export const Post = () => {
  return (
    <div className={landing.headerbasic2}>
      <div className={landing.basic2}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className={landing.imagecontainer}>
                <img
                  className="img-fluid"
                  src={require("../assets/img/details-1-office-worker.svg")}
                  alt="alternative"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className={landing.textcontainer}>
                <h2>Search For Optimization Wherever Is Possible</h2>
                <ul className={"list-unstyled " + landing.lispacelg}>
                  <li className="media">
                    <i className="fa fa-check"></i>
                    <div className="mediabody">
                      Basically we'll teach you step by step what you need to do
                    </div>
                  </li>
                  <li className="media">
                    <i className="fa fa-check"></i>
                    <div className="mediabody">
                      In order to develop your company and reach new heights
                    </div>
                  </li>
                  <li className="media">
                    <i className="fa fa-check"></i>
                    <div className="mediabody">
                      Everyone will be pleased from stakeholders to employees
                    </div>
                  </li>
                </ul>
                <Link
                  className={landing.btnsolidreg + " popup-with-move-anim"}
                  to="#details-lightbox-2"
                >
                  LIGHTBOX
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
