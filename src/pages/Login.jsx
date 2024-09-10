import React from "react";
import LoginForm from "../components/LoginForm";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import useStore from "../data/store";

const Login = () => {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);

  const handleLogin = async (formData) => {
    try {
      const response = await login(formData);
      // 사용자 정보 저장
      setUser({
        userId: response.userId,
        nickname: response.nickname,
        avatar: response.avatar
      });
      console.log("setUser 호출 후 상태:", useStore.getState());

      // 토큰 저장
      localStorage.setItem("accessToken", response.accessToken);
      console.log(localStorage.getItem("accessToken"));
      navigate("/");
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인 실패: " + (error.response?.data?.message || "알 수 없는 오류"));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[70vh] w-full max-w-[400px] border border-gray-300 rounded-lg p-8 mx-auto shadow-md">
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default Login;
