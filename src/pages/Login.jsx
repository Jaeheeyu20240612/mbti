import AuthForm from "../components/authForm";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handelLogin = async (formData) => {
    const data = await login(formData);
    setUser(data);
    localStorage.setItem("token", data.accessToken);
    alert("로그인되었습니다");
    navigate("/");
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-[70vh] w-full max-w-[400px] border border-gray-300 rounded-lg p-8 mx-auto shadow-md">
      <AuthForm onSubmit={handelLogin} mode="login" />
      <Link className="block border border-yellow-400 rounded-md p-3 w-[243px] text-center mb-2" to={"/signup"}>
        회원가입
      </Link>
    </div>
  );
};

export default Login;
