import React from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  if (localStorage.getItem("user")) history.push("/home");

  return <></>;
};

export default Login;
