import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { AdminSignin, authenticate } from "../helper";
import Menu from "../core/Menu";
import Background from "../assets/img/ocean.jpg";
import style from "../assets/style/Sign.module.css";

class signinAdmin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      redirectToReferer: false,
      loading: false,
      hidden: true,
    };
    this.toggleShow = this.toggleShow.bind(this);
  }

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;
    const admin = {
      email,
      password,
    };
    // console.log(admin);
    AdminSignin(admin).then((data) => {
      if (data.error) {
        this.setState({ error: data.error, loading: false });
      } else {
        // authenticate
        authenticate(data, () => {
          this.setState({ redirectToReferer: true });
        });
      }
    });
  };

  signinForm = (email, password) => (
    <form className={style.login100form + " " + style.svalidateform}>
      <div className="p-t-31 p-b-9">
        <span className={style.txt1}>Email</span>
      </div>
      <div className={style.wrapinput100}>
        <input
          onChange={this.handleChange("email")}
          type="email"
          className={style.input100}
          value={email}
        />
        <span className={style.focusinput100}></span>
      </div>
      <div className="p-t-13 p-b-9">
        <span className={style.txt1}>Password</span>
      </div>
      <div className={style.wrapinput100}>
        <input
          onChange={this.handleChange("password")}
          type={this.state.hidden ? "password" : "text"}
          className={style.input100}
          value={password}
        />
        <span className={style.focusinput100}></span>
        <Link onClick={this.toggleShow} className={style.show}>
          {this.state.hidden ? (
            <i className="fa fa-eye"></i>
          ) : (
            <i className="fa fa-eye-slash" aria-hidden="true"></i>
          )}
        </Link>
      </div>
      <div className={style.containerlogin100formbtn + " m-t-17"}>
        <button onClick={this.clickSubmit} className={style.login100formbtn}>
          Sign In
        </button>
      </div>
    </form>
  );

  render() {
    const { email, password, error, redirectToReferer, loading } = this.state;

    if (redirectToReferer) {
      return <Redirect to="/" />;
    }
    return (
      <Menu>
        <div className={style.limiter}>
          <div
            className={style.containerlogin100}
            style={{ backgroundImage: `url(${Background})` }}
          >
            <div
              className={
                style.wraplogin100 +
                " p-l-110 p-r-110 p-t-62 p-b-33 flex-sb flex-w"
              }
            >
              <span className={style.login100formtitle + " p-b-53"}>Masuk</span>
              <div
                className="alert alert-danger"
                style={{ display: error ? "" : "none" }}
              >
                {error}
              </div>
              {loading ? (
                <div className="lds-roller">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                ""
              )}

              {this.signinForm(email, password)}
            </div>
          </div>
        </div>
      </Menu>
    );
  }
}

export default signinAdmin;
