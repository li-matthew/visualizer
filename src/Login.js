import React from "react";
import { loginUrl } from './spotify'

const Login = () => {
  return (
    <div className="login">
      <a href={loginUrl}>login</a>
    </div>
  );
}

export default Login;