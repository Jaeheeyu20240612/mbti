import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../api/auth";

const PublickRoute = () => {
  const navigate = useNavigate();
  // localStorage에서 토큰 가져오기
  const token = localStorage.getItem("token");

  // 토큰이 있는 경우에만 사용자 정보를 요청하기
  const { data: user } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUserProfile(token),
    enabled: !!token // 토큰이 있을 때만 쿼리를 실행한다는 의미!!
  });
  // 로그인되어있으면 리다이렉트
  useEffect(() => {
    if (user?.success === true) {
      navigate("/");
    }
  }, [user]);

  return <Outlet />;
};
export default PublickRoute;
