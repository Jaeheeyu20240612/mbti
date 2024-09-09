import { createContext, useEffect, useContext, useState } from "react";
import { getUserProfile } from "../api/auth";
import useStore from "../data/store";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const { user, setUser } = useStore((state) => ({
    user: state.user,
    setUser: state.setUser
  }));
  const [localUser, setLocalUser] = useState(user);

  const fetchUserData = async () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const userData = await getUserProfile(token);
      setLocalUser({
        userId: userData.id,
        nickname: userData.nickname,
        avatar: userData.avatar
      });
      setUser({
        userId: userData.id,
        nickname: userData.nickname,
        avatar: userData.avatar
      });
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return <UserContext.Provider value={{ user: localUser, setUser }}>{children}</UserContext.Provider>;
};

export default UserProvider;
