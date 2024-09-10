import axios from "axios";

const API_URL = "https://moneyfulpublicpolicy.co.kr";

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  console.log(response.data);
  return response.data;
};

export const login = async (userData) => {
  const { data } = await axios.post(`${API_URL}/login`, userData);
  return data;
};

export const getUserProfile = async (token) => {
  const { data } = await axios.get(`${API_URL}/user`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  console.log(data);
};

export const updateProfile = async (newAvatar, newNickname, token) => {
  // FormData 객체 생성
  const formData = new FormData();
  if (newAvatar) {
    formData.append("avatar", newAvatar);
  }
  if (newNickname) {
    formData.append("nickname", newNickname);
  }

  const { data } = await axios.patch(`${API_URL}/profile`, formData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  getUserProfile();
  return data;
};
