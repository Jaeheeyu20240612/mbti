import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

// Props 로 꼭 children 만 받을 필요는 없답니다.
const Layout = ({ children }) => {
  const navigate = useNavigate();

  // 이곳에서 로그인 하지 않은 사용자를 login 페이지로 보내줄 거에요.
  useEffect(() => {}, []);

  const handleLogout = () => {};

  return (
    <div>
      <header>
        <nav>
          <Link to="/">홈</Link>
          <div className="space-x-4">
            {user ? (
              <>
                <button onClick={handleLogout}>로그아웃</button>
              </>
            ) : (
              <Link to="/login">로그인</Link>
            )}
          </div>
          <Link to="/signup">회원가입</Link>
        </nav>
      </header>
      <main className="container mx-auto pt-10 main">{children}</main>
    </div>
  );
};

export default Layout;
