// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import TestResultPage from "../pages/TestResultPage";
import TestPage from "../pages/TestPage";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";
import PublicRoute from "../components/PublicRoute";
import PrivateRoute from "../components/PrivateRoute";
import Layout from "../components/layout/Layout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<PublicRoute element={Home} restricted={false} />} />
          <Route path="/login" element={<PublicRoute element={Login} restricted={true} />} />
          <Route path="/signup" element={<PublicRoute element={Signup} restricted={true} />} />
          <Route path="/" element={<PrivateRoute element={Home} restricted={false} />} />
          <Route path="/profile" element={<PrivateRoute element={Profile} />} />
          <Route path="/test" element={<PrivateRoute element={TestPage} />} />
          <Route path="/test-results" element={<PrivateRoute element={TestResultPage} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
