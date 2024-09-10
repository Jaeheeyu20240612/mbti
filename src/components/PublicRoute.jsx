// src/components/PublicRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import useStore from "../data/store";

const PublicRoute = ({ element: Element, restricted }) => {
  const { isAuthenticated } = useStore();

  return isAuthenticated && restricted ? <Navigate to="/login" /> : <Element />;
};
export default PublicRoute;
