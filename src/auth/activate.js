import React, { useState, useEffect } from "react";
import { accountActivation } from "../helper";
import { Link } from "react-router-dom";
import Menu from "../core/Menu";
import jwt from "jsonwebtoken";

const Activate = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    token: "",
    show: true,
    error: "",
  });

  const { name, open, token, error } = values;

  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);
    // console.log(token);
    if (token) {
      setValues({ ...values, name, token });
    }
  }, []);

  const clickSubmit = (event) => {
    event.preventDefault();
    const user = {
      token,
    };
    accountActivation(user).then((data) => {
      if (data.error) setValues({ error: data.error });
      else setValues({ open: true });
    });
  };

  const activationLink = () => (
    <button className="btn btn-outline-primary" onClick={clickSubmit}>
      Aktivasi Akun
    </button>
  );

  return (
    <Menu>
      <div className="col-md-6 offset-md-3">
        <div className="text-center">
          <h1 className="p-5">Hi, {name} Silahkan Aktivasi Akun Anda</h1>
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
            Aktivasi berhasil, silahkan <Link to="/signin">Masuk</Link>!
          </div>
          {activationLink()}
        </div>
      </div>
    </Menu>
  );
};

export default Activate;
