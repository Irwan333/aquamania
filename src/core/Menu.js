import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuth, signout } from "../helper";
import { itemTotal } from "../helper/Cart";
import "../assets/style/Menu.css";
import "../assets/style/Fonts.css";

const Menu = ({ children, match, history }) => {
  const isActive = (path) => {
    if (match.path === path) {
      return "nav-link OpenSans-Bold";
    } else {
      return "nav-link OpenSans-Regular";
    }
  };

  const nav = () =>
    !(
      !isAuth() &&
      (history.location.pathname === "/" ||
        history.location.pathname === "/post")
    ) ? (
      <nav
        className="navbar navbar-light navbar-expand-lg"
        style={{ background: "#e3f2fd" }}
      >
        <div className="container">
          <Link className="navbar-brand" to="#">
            LOGO
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mainMenu">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/" className={isActive("/")}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/post" className={isActive("/post")}>
                  Postingan
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/cart" className={isActive("/cart")}>
                  Cart{" "}
                  <sup>
                    <small className="cart-badge">{itemTotal()}</small>
                  </sup>
                </Link>
              </li>

              {isAuth() && isAuth().role === 0 && (
                <Fragment>
                  <li className="nav-item">
                    <Link
                      to="/post/create"
                      className={isActive("/post/create")}
                    >
                      Buat Post
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={`/user/${isAuth()._id}`}
                      className={isActive(`/user/${isAuth()._id}`)}
                    >
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={`/findpeople`}
                      className={isActive(`/findpeople`)}
                    >
                      Cari pengguna
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to={`/user/dashboard`}
                      className={isActive(`/dashboard`)}
                    >
                      Riwayat
                    </Link>
                  </li>
                </Fragment>
              )}
              {isAuth() && isAuth().role === 1 && (
                <Fragment>
                  <li className="nav-item">
                    <Link to="/admin" className={isActive("/admin")}>
                      Admin
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/admin/dashboard"
                      className={isActive("/admin/dashboard")}
                    >
                      Dashboard
                    </Link>
                  </li>
                </Fragment>
              )}
            </ul>
            {!isAuth() && (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/signup" className={isActive("/signup")}>
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signin" className={isActive("/signin")}>
                    Sign In
                  </Link>
                </li>
              </ul>
            )}

            {isAuth() && (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/users" className={isActive("/users")}>
                    Pengguna
                  </Link>
                </li>
                <li className="nav-item">
                  <span
                    className="nav-link"
                    style={{ cursor: "pointer", color: "#fff" }}
                    onClick={() => {
                      signout(() => {
                        history.push("/");
                      });
                    }}
                  >
                    Keluar
                  </span>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    ) : (
      <nav
        className={
          "navbar navbar-expand-lg navbar-dark navbar-custom fixed-top"
        }
      >
        <a className="navbar-brand logo-image" href="index.html">
          <img src={require("../assets/img/logo.jpg")} alt="alternative" />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-awesome fas fa-bars"></span>
          <span className="navbar-toggler-awesome fas fa-times"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" className={isActive("/")}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/post" className={isActive("/post")}>
                Postingan
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className={isActive("/cart")}>
                Cart{" "}
                <sup>
                  <small className="cart-badge">{itemTotal()}</small>
                </sup>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className={isActive("/signup")}>
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signin" className={isActive("/signin")}>
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );

  return (
    <Fragment>
      {nav()}
      {children}
    </Fragment>
  );
};

export default withRouter(Menu);
