import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../api/auth";
import styled from "styled-components";
import useStore from "../../data/store";

const Layout = () => {
  const token = localStorage.getItem("accessToken");
  console.log(token);
  const navigate = useNavigate();

  // 로그아웃
  const handleLogout = async () => {
    if (window.confirm("로그아웃하시겠습니까?")) {
      await logout();
      navigate("/");
    }
  };

  return (
    <div>
      <header>
        <nav>
          <NavigationDiv>
            {token ? (
              <>
                <PrivateLinks to="/">홈</PrivateLinks>
                <PrivateLinks to="/test">테스트</PrivateLinks>
                <PrivateLinks to="/results">결과보기</PrivateLinks>
                <PrivateLinks to="/profile">프로필</PrivateLinks>
                <PrivateLinks to="#" onClick={handleLogout}>
                  로그아웃
                </PrivateLinks>
              </>
            ) : (
              <>
                <PublickLinks to="/">홈</PublickLinks>
                <PublickLinks to="/login">로그인</PublickLinks>
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
