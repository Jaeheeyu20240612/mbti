import axios from "axios";
import useStore from "../data/store";

const API_URL = "https://moneyfulpublicpolicy.co.kr";

// 회원가입
export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// 로그인
export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    const token = response.data.token;

    if (token) {
      localStorage.setItem("accessToken", token);
      console.log("Token saved to localStorage:", token);
      useStore.getState().setUser(response.data.user);
    }

    return response.data;
  } catch (error) {
    console.error("로그인 실패:", error);
    throw error;
  }
};

// 로그아웃
export const logout = () => {
  try {
    // 로컬 스토리지에서 토큰 삭제
    localStorage.removeItem("accessToken");

    // 주스탠드 스토어에서 사용자 정보 삭제
    useStore.getState().clearUser(); // clearUser 호출
  } catch (error) {
    console.error("로그아웃 실패:", error);
    throw error;
  }
};
// 회원정보 확인
export const getUserData = async (token) => {
  if (!token) throw new Error("토큰이 없습니다.");

  const response = await axios.get(`${API_URL}/user`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};
