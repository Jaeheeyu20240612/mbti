import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../api/auth";
import styled from "styled-components";
import useStore from "../../data/store";

const Layout = () => {
  const { isAuthenticated, setUser } = useStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    setUser: state.setUser
  }));
  const navigate = useNavigate();

  // 로그아웃 처리
  const handleLogout = async () => {
    try {
      logout(); // 로컬스토리지 및 Zustand 스토어에서 상태 업데이트
      setUser(null); // 사용자 정보 초기화
      navigate("/login"); // 로그인 페이지로 이동
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <div>
      <header>
        <nav>
          <NavigationDiv>
            {isAuthenticated ? (
              <>
                <PrivateLinks to="/">홈</PrivateLinks>
                <PrivateLinks to="/profile">프로필</PrivateLinks>
                <PrivateLinks to="/test">테스트 페이지</PrivateLinks>
                <PrivateLinks to="/test-results">테스트 결과 페이지</PrivateLinks>
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
      {/* 화면 크기에 따라 헤더와 메인 사이 간격을 동적으로 유지 */}
      <main className="container mx-auto pt-10 sm:pt-8 md:pt-12 lg:pt-16 main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

const NavigationDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  background-color: gold;
  gap: 1em;
`;

const PublickLinks = styled(Link)`
  width: 50%;
  font-size: 1.2rem;
  padding: 1.5em;
  text-align: center;
  text-decoration: none;
  display: block;
  transition: 0.5s;
  &:hover {
    color: white;
    background-color: crimson;
    width: 60%;
  }
`;

const PrivateLinks = styled(Link)`
  width: 20%;
  font-size: 1.2rem;
  padding: 1.5em;
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
