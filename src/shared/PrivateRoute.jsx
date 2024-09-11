import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useQueryClient } from "@tanstack/react-query";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = queryClient.getQueriesData("users");
  // 로그인되어있으면 리다이렉트

  if (user?.success === false) {
    alert("로그인을 해주세요.");
    navigate("/login");
  }
  return <Outlet />;
};

export default PrivateRoute;
