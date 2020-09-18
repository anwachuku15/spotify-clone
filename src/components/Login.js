import React from "react";
import "../css/Login.css";
import { loginUrl } from "../spotify";

const Login = () => {
  return (
    <div className="loginContainer">
      <img src={require("../assets/img/logos/white.png")} alt="" />
      <div className="button">
        <img src={require("../assets/img/icons/white.png")} alt="" />
        <a href={loginUrl}>LOGIN</a>
      </div>
    </div>
  );
};

export default Login;
