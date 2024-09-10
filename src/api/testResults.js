import axios from "axios";
import useStore from "../data/store";

const API_URL = "http://localhost:5000/testResults";

export const getTestResults = async () => {
  const response = await axios.get(API_URL);
  console.log(response.data);
  return response.data;
};

export const createTestResult = async (resultData) => {
  const token = localStorage.getItem("accessToken");
  const { user } = useStore.getState();
  try {
    const response = await axios.post(API_URL, {
      ...resultData,
      nickname: user.nickname, // 현재 사용자 닉네임 사용
      visibility: false // 기본적으로 자신만 볼 수 있도록 설정
    });
    console.log(response.data);
    getTestResults();
    return response.data;
  } catch (error) {
    console.error("테스트 결과 생성 실패:", error);
    throw error; // 에러 발생 시 호출한 쪽에서 처리
  }
};

export const deleteTestResult = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  getTestResults();
};

export const updateTestResultVisibility = async (id, visibility) => {
  const response = await axios.patch(`${API_URL}/${id}`, { visibility });
  getTestResults();
};
