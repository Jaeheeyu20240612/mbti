import axios from "axios";

const API_URL = "http://localhost:5000/testResults";

export const getTestResults = async () => {
  const response = await axios.get(`${API_URL}?_sort=date&_order=desc`);
  console.log(response.data);
  return response.data;
};

export const createTestResult = async (resultData, user) => {
  const response = await axios.post(API_URL, {
    ...resultData,
    nickname: user.nickname, // UserContext에서 받은 nickname 사용
    visibility: false // 기본적으로 자신만 볼 수 있도록 설정
  });
  console.log(response);
  return response.data;
};

export const deleteTestResult = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const updateTestResultVisibility = async (id, visibility) => {
  const response = await axios.patch(`${API_URL}/${id}`, { visibility });
  return response.data;
};
