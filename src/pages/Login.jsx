import AuthForm from "../components/authForm";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getUserProfile, login } from "../api/auth";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const Login = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationFn: async (userData) => {
      const loginData = await login(userData);
      // 로그인 성공 후, 유저 정보를 'users' 쿼리 키에 저장
      queryClient.setQueryData("users", loginData);
      console.log(loginData.accessToken);
      localStorage.setItem("token", loginData.accessToken);
      return loginData;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["users"]);
      navigate("/");
    }
  });

  const handleLogin = (formData) => {
    mutateAsync(formData);
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-[70vh] w-full max-w-[400px] border border-gray-300 rounded-lg p-8 mx-auto shadow-md">
      <AuthForm onSubmit={handleLogin} mode="login" />
      <Link className="block border border-yellow-400 rounded-md p-3 w-[252px] text-center mb-2" to={"/signup"}>
        회원가입
      </Link>
    </div>
  );
};

export default Login;
