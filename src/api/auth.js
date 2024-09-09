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
    const token = localStorage.getItem("accessToken");

    if (token) {
      // 서버 로그아웃 요청이 필요한 경우에만 실행
      try {
        await axios.post(
          `${API_URL}/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      } catch (serverError) {
        console.error("서버 로그아웃 요청 실패:", serverError);
      }
    }
    // 로컬 스토리지에서 토큰 삭제
    localStorage.removeItem("accessToken");
    // Zustand 스토어에서 사용자 정보 삭제
    useStore.getState().clearUser();
    console.log("로그아웃 성공");
  } catch (error) {
    console.error("로그아웃 실패:", error);
    throw error; // 에러 발생 시 에러를 throw해서 호출한 쪽에서 처리
  }
};
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
