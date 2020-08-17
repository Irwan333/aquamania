import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { googleLogin, authenticate } from "../helper";
import style from "../assets/style/Sign.module.css";

class Google extends Component {
  constructor() {
    super();
    this.state = {
      redirectToReferrer: false,
    };
  }

  responseGoogle = (response) => {
    console.log("response", response);
    const tokenId = response.tokenId;
    const user = {
      tokenId: tokenId,
    };
    console.log(user);

    googleLogin(user).then((data) => {
      console.log("signin data: ", data);
      if (data.error) {
        console.log("Error Login. Please try again..");
      } else {
        console.log("signin success - setting jwt: ", data);
        authenticate(data, () => {
          console.log("social login response from api", data);
          this.setState({ redirectToReferrer: true });
        });
      }
    });
  };

  render() {
    // redirect
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer) {
      return <Redirect to="/" />;
    }

    return (
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
        buttonText="Login with Google"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
        render={(renderProps) => (
          <Link
            to="#"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className={style.btngoogle + " m-b-20"}
          >
            <img src={require("../assets/img/icon-google.png")} alt="GOOGLE" />{" "}
            Google
          </Link>
        )}
        cookiePolicy={"single_host_origin"}
      />
    );
  }
}

export default Google;
