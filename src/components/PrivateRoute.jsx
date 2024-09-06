// src/components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import useStore from "../data/store";

const PrivateRoute = ({ element: Element }) => {
  const { isAuthenticated } = useStore();

  return isAuthenticated ? <Element /> : <Navigate to="/login" />;
};

export default PrivateRoute;
