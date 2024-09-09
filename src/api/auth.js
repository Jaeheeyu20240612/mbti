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
    const token = response.data.accessToken;
    if (token) {
      localStorage.setItem("accessToken", token);
      console.log(token);
    }
    return response.data;
  } catch (error) {
    console.error("로그인 실패:", error);
    throw error;
  }
};

// 로그아웃
export const logout = async () => {
  try {
    // 로컬 스토리지에서 토큰 삭제
    localStorage.removeItem("accessToken");
    // 주스탠드 스토어에서 사용자 정보 삭제
    useStore.getState().clearUser();
  } catch (error) {
    console.error("로그아웃 실패:", error);
    throw error;
  }
};

// 유저 정보 가져오기
export const getUserProfile = async (token) => {
  if (!token) {
    return;
  }
  try {
    console.log("서버로 전송하는 토큰:", token); // 토큰 확인
    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("사용자 데이터 로딩 실패:", error);
  }
};

export const updateProfile = async (avatarFile, newNickname) => {
  const token = localStorage.getItem("accessToken");

  // FormData 객체 생성
  const formData = new FormData();
  if (avatarFile) {
    formData.append("avatar", avatarFile);
  }
  if (newNickname) {
    formData.append("nickname", newNickname);
  }

  try {
    const response = await axios.patch(`${API_URL}/profile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error("프로필 업데이트 실패:", error);
  }
};
