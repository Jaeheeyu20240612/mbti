import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoute = () => {
  const navigate = useNavigate();
  // 로그인되어있으면 리다이렉트
  const { user } = useContext(UserContext);
  if (user?.success === false) {
    alert("로그인을 해주세요.");
    navigate("/login");
  }
  return <Outlet />;
};

export default PrivateRoute;
