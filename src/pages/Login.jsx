import React from "react";
import LoginForm from "../components/LoginForm";
import { login, getUserData } from "../api/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useStore from "../data/store";
import { SignContainer } from "../components/ui/signContainer";

const Login = () => {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  const setIsAuthenticated = useStore((state) => state.setIsAuthenticated);

  const handleLogin = async (formData) => {
    try {
      const response = await login(formData);
      console.log("로그인 성공:", response);

      // 주스탠드와 로컬 스토리지에 저장된 데이터 콘솔에 찍기
      console.log("주스탠드 데이터:", useStore.getState());
      console.log("로컬 스토리지 데이터:", localStorage.getItem("accessToken"));

      // 사용자 정보 저장
      setUser({
        userId: response.userId,
        nickname: response.nickname,
        avatar: response.avatar
      });
      setIsAuthenticated(true);

      // 토큰 저장
      localStorage.setItem("accessToken", response.accessToken);

      // 추가: 사용자 정보 확인
      const token = localStorage.getItem("accessToken");
      if (token) {
        const userData = await getUserData(token);
        console.log("사용자 데이터:", userData);
      }

      navigate("/");
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인 실패: " + (error.response?.data?.message || "알 수 없는 오류"));
    }
  };

  return (
    <SignContainer className="login-page">
      <LoginForm onSubmit={handleLogin} />
    </SignContainer>
  );
};

export default Login;
