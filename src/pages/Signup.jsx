import React from "react";
import AuthForm from "../components/authForm";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = async (formData) => {
    await register(formData);
    alert("회원가입이 완료되었습니다");
    navigate("/login");
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-[70vh] w-full max-w-[400px] border border-gray-300 rounded-lg p-8 mx-auto shadow-md">
      <AuthForm mode="signup" onSubmit={handleSignUp} />
    </div>
  );
};

export default SignUp;
