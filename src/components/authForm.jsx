import React, { useState } from "react";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";

// 회원가입인지 로그인인지 구분하기 위해 mode 를 props 로 받습니다.
// onSubmit 도 회원가입과 로그인 페이지에서 각각 구현을 하고 props 로 넘겨줄 겁니다.
const AuthForm = ({ mode, onSubmit }) => {
  const navigate = useNavigate();
  // 무엇을 formData 에 넣어야 할까요?
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    nickname: ""
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // id 입력을 위한 input 만 힌트로 만들어 두었습니다. 참고해서 한번 만들어봅시다!
  return (
    <div>
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center">
          <input
            className="w-full p-4 border border-gray-300 rounded-lg mb-3"
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="아이디"
            required
          />
          <input
            className="w-full p-4 border border-gray-300 rounded-lg mb-3"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호"
            required
          />
        </div>
        {mode === "signup" && (
          <div>
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="닉네임"
              required
              className="w-full p-4 border border-gray-300 rounded-lg mb-3"
            />
          </div>
        )}
        <button className="block border border-yellow-400 rounded-md p-3 w-full text-center mb-2" type="submit">
          {mode === "login" ? "로그인" : "회원가입"}
        </button>
      </form>
      {mode === "signup" ? (
        <button
          onClick={() => navigate("/login")}
          className="block border border-yellow-400 rounded-md p-3 w-full text-center mb-2"
          type="submit"
        >
          로그인페이지로
        </button>
      ) : null}
    </div>
  );
};

export default AuthForm;
