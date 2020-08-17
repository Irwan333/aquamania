import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { facebookLogin, authenticate } from "../helper";
import style from "../assets/style/Sign.module.css";
import "../assets/style/Util.css";

class Facebook extends Component {
  constructor() {
    super();
    this.state = {
      redirectToReferrer: false,
    };
  }

  responseFacebook = (response) => {
    // console.log("response", response);
    const accessToken = response.accessToken;
    const userID = response.userID;
    const user = {
      userID: userID,
      accessToken: accessToken,
    };

    facebookLogin(user).then((data) => {
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
      <FacebookLogin
        appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
        autoLoad={false}
        callback={this.responseFacebook}
        render={(renderProps) => (
          <Link
            to="#"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className={style.btnface + " m-b-20"}
          >
            <i className="fa fa-facebook-official"></i>
            Facebook
          </Link>
        )}
      />
    );
  }
}

export default Facebook;
