import React, { Component } from "react";
import { forgotPassword } from "../helper";
import Menu from "../core/Menu";
import Background from "../assets/img/ocean.jpg";
import style from "../assets/style/Sign.module.css";

class Forgot extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      error: "",
    };
  }

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    forgotPassword(this.state.email).then((data) => {
      if (data.error) this.setState({ error: data.error });
      else
        this.setState({
          error: "",
          email: "",
          open: true,
        });
    });
  };

  passwordForgotForm = (email) => (
    <form className={style.login100form + " " + style.svalidateform}>
      <div className="p-t-31 p-b-9">
        <span className={style.txt1}>Email</span>
      </div>
      <div className={style.wrapinput100}>
        <input
          onChange={this.handleChange("email")}
          value={email}
          type="email"
          className={style.input100}
        />
        <span className={style.focusinput100}></span>
      </div>

      <div className={style.containerlogin100formbtn + " m-t-17"}>
        <button onClick={this.clickSubmit} className={style.login100formbtn}>
          Kirim
        </button>
      </div>
    </form>
  );

  render() {
    const { email, error, open } = this.state;

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
                Lupa Password
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
                Kode verifikasi terkirim. Silahkan cek email!
              </div>
              {this.passwordForgotForm(email)}
            </div>
          </div>
        </div>
      </Menu>
    );
  }
}

export default Forgot;
