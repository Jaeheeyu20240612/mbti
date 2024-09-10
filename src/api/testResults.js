import axios from "axios";
import useStore from "../data/store";

const API_URL = "http://localhost:5000/testResults";

export const getTestResults = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const deleteTestResult = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  getTestResults();
};

export const updateTestResultVisibility = async (id, visibility) => {
  const response = await axios.patch(`${API_URL}/${id}`, { visibility });
  getTestResults();
};
