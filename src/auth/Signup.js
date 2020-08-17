import React, { Component } from "react";
import { signup } from "../helper";
import Menu from "../core/Menu";
import Background from "../assets/img/ocean.jpg";
import style from "../assets/style/Sign.module.css";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      error: "",
      loading: false,
    };
  }

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { name, email, password, confirmPassword } = this.state;
    const user = {
      name,
      email,
      password,
      confirmPassword,
    };
    // console.log(user);

    signup(user).then((data) => {
      if (data.error) this.setState({ error: data.error, loading: false });
      else
        this.setState({
          error: "",
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          open: true,
          loading: false,
        });
    });
  };

  signupForm = (name, email, password, confirmPassword) => (
    <form className={style.login100form + " " + style.validateform}>
      <div className="p-t-31 p-b-9">
        <span className={style.txt1}>Nama</span>
      </div>
      <div className={style.wrapinput100}>
        <input
          onChange={this.handleChange("name")}
          type="text"
          className={style.input100}
          value={name}
        />
        <span className={style.focusinput100}></span>
      </div>
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
      <div className="p-t-31 p-b-9">
        <span className={style.txt1}>Password</span>
      </div>
      <div className={style.wrapinput100}>
        <input
          onChange={this.handleChange("password")}
          type="password"
          className={style.input100}
          value={password}
        />
        <span className={style.focusinput100}></span>
      </div>
      <div className="p-t-31 p-b-9">
        <span className={style.txt1}>Konfirmasi Password</span>
      </div>
      <div className={style.wrapinput100}>
        <input
          onChange={this.handleChange("confirmPassword")}
          type="password"
          className={style.input100}
          value={confirmPassword}
        />
        <span className={style.focusinput100}></span>
      </div>
      <div className={style.containerlogin100formbtn + " m-t-17"}>
        <button onClick={this.clickSubmit} className={style.login100formbtn}>
          Sign In
        </button>
      </div>
    </form>
  );

  render() {
    const {
      name,
      email,
      password,
      confirmPassword,
      error,
      open,
      loading,
    } = this.state;
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
              <span className={style.login100formtitle + " p-b-53"}>
                Daftar
              </span>
              <div
                className="alert alert-danger"
                style={{ display: error ? "" : "none" }}
              >
                {error}
              </div>

              <div
                className="alert alert-info"
                style={{ display: open ? "" : "none" }}
              >
                Akun telah dibuat. Silahkan cek email dan aktivasi!
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
              {this.signupForm(name, email, password, confirmPassword)}
            </div>
          </div>
        </div>
      </Menu>
    );
  }
}

export default Signup;
