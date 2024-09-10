import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import TestResultPage from "../pages/TestResultPage";
import TestPage from "../pages/TestPage";

import SignUp from "../pages/Signup";
import Layout from "../components/layout/Layout";
import Profile from "../pages/Profile";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<PublicRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/mypage" element={<Profile />} />
            <Route path="/results" element={<TestResultPage />} />
            <Route path="/test" element={<TestPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
