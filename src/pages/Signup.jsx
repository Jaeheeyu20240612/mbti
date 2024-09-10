import React from "react";
import { register } from "../api/auth";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SignupForm from "../components/SignUpForm";
import { LoginContainer } from "../components/LoginContainer";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (formData) => {
    try {
      await register(formData);
      alert("회원 가입이 완료되었습니다");
      navigate("/login"); // 회원가입 성공 후 로그인 페이지로 리다이렉트
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입 실패: " + (error.response?.data?.message || "알 수 없는 오류"));
    }
  };

  return (
    <LoginContainer>
      <SignupForm onSubmit={handleSignup} />
    </LoginContainer>
  );
};

export default Signup;
