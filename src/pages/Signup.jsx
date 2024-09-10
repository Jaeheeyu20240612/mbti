import React from "react";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";
import SignupForm from "../components/SignUpForm";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (formData) => {
    await register(formData);
    alert("회원 가입이 완료되었습니다");
    navigate("/login"); // 회원가입 성공 후 로그인 페이지로 리다이렉트
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[70vh] w-full max-w-[400px] border border-gray-300 rounded-lg p-8 mx-auto shadow-md">
      <SignupForm onSubmit={handleSignup} />
    </div>
  );
};

export default Signup;
