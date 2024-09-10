import axios from "axios";
import useStore from "../data/store";

const API_URL = "https://moneyfulpublicpolicy.co.kr";

// 유저 정보 가져오기
export const getUserProfile = async (token) => {
  if (!token) {
    return;
  }
  try {
    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    const userData = response.data;
    console.log(userData);
    useStore.getState().setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    return userData;
  } catch (error) {
    console.error("사용자 데이터 로딩 실패:", error);
  }
};

// 회원가입
export const register = async (userData) => {
  const { data } = await axios.post(`${API_URL}/register`, userData);
  getUserProfile();
};

// 로그인
export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    const token = response.data.accessToken;
    const loginData = response.data;
    if (token) {
      localStorage.setItem("accessToken", token);
      localStorage.setItem("loginData", loginData);
    }
    getUserProfile();
    return response.data;
  } catch (error) {
    console.error("로그인 실패:", error);
    throw error;
  }
};

// 로그아웃
export const logout = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    // 로컬 스토리지에서 데이터 삭제
    localStorage.removeItem("accessToken");
    localStorage.removeItem("loginData");
    // Zustand 스토어에서 사용자 정보 삭제
    useStore.getState().clearUser();
    console.log("로그아웃 성공");
    getUserProfile();
  } catch (error) {
    console.error("로그아웃 실패:", error);
    throw error; // 에러 발생 시 에러를 throw해서 호출한 쪽에서 처리
  }
};

// 프로필 업데이트
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
    const updatedUserData = response.data;
    // 프로필 업데이트 후, Zustand 스토어 및 로컬 스토리지 동기화
    useStore.getState().setUser(updatedUserData);
    // 로컬 스토리지에 업데이트된 사용자 정보 저장
    localStorage.setItem("user", JSON.stringify(updatedUserData));
    getUserProfile();
    return updatedUserData;
  } catch (error) {
    console.error("프로필 업데이트 실패:", error);
  }
};
