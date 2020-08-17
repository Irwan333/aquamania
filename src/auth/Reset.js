import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { resetPassword } from "../helper";
import { Link } from "react-router-dom";
import Menu from "../core/Menu";
import Background from "../assets/img/ocean.jpg";
import style from "../assets/style/Sign.module.css";

const Reset = ({ match }) => {
  // props.match from react router dom
  const [values, setValues] = useState({
    token: "",
    newPassword: "",
    hidden: true,
  });

  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);
    // console.log(name);
    if (token) {
      setValues({ ...values, name, token });
    }
  }, []);

  const { token, newPassword, error, open, hidden } = values;
  const toggleShow = () => {
    setValues({ hidden: !hidden });
  };

  const handleChange = (event) => {
    setValues({ ...values, newPassword: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    const user = {
      newPassword,
      resetPasswordLink: token,
    };
    resetPassword(user).then((data) => {
      if (data.error) setValues({ error: data.error });
      else setValues({ open: true });
    });
  };

  const passwordResetForm = () => (
    <form className={style.login100form + " " + style.svalidateform}>
      <div className="p-t-31 p-b-9">
        <span className={style.txt1}>Password Baru</span>
      </div>
      <div className={style.wrapinput100}>
        <input
          onChange={handleChange}
          value={newPassword}
          type={hidden ? "password" : "text"}
          className={style.input100}
          required
        />
        <span className={style.focusinput100}></span>
        <Link onClick={toggleShow} className="show">
          {hidden ? (
            <i className="fa fa-eye"></i>
          ) : (
            <i className="fa fa-eye-slash" aria-hidden="true"></i>
          )}
        </Link>
      </div>

      <div className={style.containerlogin100formbtn + " m-t-17"}>
        <button onClick={clickSubmit} className={style.login100formbtn}>
          Reset Password
        </button>
      </div>
    </form>
  );

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
              Reset Password
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
              Password berhasil diubah. Silahkan <Link to="/signin">Masuk</Link>
              !
            </div>
            {passwordResetForm()}
          </div>
        </div>
      </div>
    </Menu>
  );
};

export default Reset;
