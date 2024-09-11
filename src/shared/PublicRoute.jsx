import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useQueryClient } from "@tanstack/react-query";

const PublickRoute = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData("users");
  // 로그인되어있으면 리다이렉트
  useEffect(() => {
    if (user?.success === true) {
      navigate("/");
    }
  }, [user]);

  return <Outlet />;
};
export default PublickRoute;
