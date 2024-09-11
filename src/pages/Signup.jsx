import React from "react";
import AuthForm from "../components/authForm";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const SignUp = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (userData) => register(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"]
      });
      alert("회원가입이 완료되었습니다.");
      navigate("/login");
    }
  });

  const handleSignUp = (formData) => {
    mutate(formData);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[70vh] w-full max-w-[400px] border border-gray-300 rounded-lg p-8 mx-auto shadow-md">
      <AuthForm mode="signup" onSubmit={handleSignUp} />
    </div>
  );
};

export default SignUp;
