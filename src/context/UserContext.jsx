import { createContext, useEffect, useContext } from "react";
import { getUserProfile } from "../api/auth";
import useStore from "../data/store";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const { user, setUser, setIsAuthenticated } = useStore((state) => ({
    user: state.user,
    setUser: state.setUser,
    setIsAuthenticated: state.setIsAuthenticated
  }));

  const fetchUserData = async () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const userData = await getUserProfile(token);
      setUser({
        userId: userData.id,
        nickname: userData.nickname,
        avatar: userData.avatar
      });
    }
  };

  useEffect(() => {
    fetchUserData(); // fetchUserData 함수를 호출합니다.
  }, []); // 빈 배열을 사용하여 컴포넌트가 처음 렌더링될 때만 호출됩니다.

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
