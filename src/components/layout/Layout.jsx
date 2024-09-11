import React, { useContext, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserProfile } from "../../api/auth";

export const Layout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");
  const { data: user } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUserProfile(token),
    // 토큰이 있는 경우에만 쿼리 실행
    enabled: !!token
  });

  // 이곳에서 로그인 하지 않은 사용자를 login 페이지로 보내줄 거에요.
  const handleLogout = () => {
    if (window.confirm("로그아웃하시겠습니까?")) {
      queryClient.removeQueries("users");
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <div>
      <header>
        <nav>
          <NavigationDiv>
            {!token ? (
              <>
                <PublickLinks to="/">홈</PublickLinks>
                <PublickLinks to="/login">로그인</PublickLinks>
              </>
            ) : (
              <>
                <PrivateLinks to="/">홈</PrivateLinks>
                <PrivateLinks to="/test">테스트</PrivateLinks>
                <PrivateLinks to="/results">결과보기</PrivateLinks>
                <PrivateLinks to="/mypage">마이페이지</PrivateLinks>
                <PrivateLinks to="#" onClick={handleLogout}>
                  로그아웃
                </PrivateLinks>
              </>
            )}
          </NavigationDiv>
        </nav>
      </header>
      <Main className="container mx-auto pt-0">
        <Outlet />
      </Main>
    </div>
  );
};

export default Layout;

const NavigationDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 115px;
  background-color: gold;
`;

const PublickLinks = styled(Link)`
  width: 50%;
  font-size: 1.2rem;
  height: 115px;
  padding-top: 1.5em;
  text-align: center;
  text-decoration: none;
  display: block;
  margin: aut;
  transition: 0.4s;
  &:hover {
    color: white;
    background-color: crimson;
    width: 60%;
  }
`;

const PrivateLinks = styled(Link)`
  margin: auto;
  width: 20%;
  height: 115px;
  font-size: 1.2rem;
  padding-top: 2em;
  text-align: center;
  text-decoration: none;
  display: block;
  transition: 0.5s;
  &:hover {
    color: white;
    background-color: crimson;
    width: 25%;
  }
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: calc(100vh - 115px);
  overflow: hidden;
  margin: auto;
`;
