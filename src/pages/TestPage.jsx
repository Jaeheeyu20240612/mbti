import { useState } from "react";
import TestForm from "../components/TestForm";
import { calculateMBTI } from "../utils/mbtiCalculator";
import { useNavigate } from "react-router-dom";
import { mbtiTypes } from "../data/mbtiTypes";
import axios from "axios";
import { getTestResults } from "../api/testResults";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserProfile } from "../api/auth";

const Test = () => {
  const [resultData, setResultData] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("users");
  const { data: user } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUserProfile(token)
  });

  const createTestResult = async (resultData) => {
    const response = await axios.post("http://localhost:5000/testResults", {
      ...resultData,
      userId: user.userId,
      nickname: user.nickname, // 현재 사용자 닉네임 사용
      visibility: true // 기본적으로 자신만 볼 수 있도록 설정
    });
    await getTestResults();
    return response.data;
  };

  const handleTestSubmit = async (answers) => {
    const result = calculateMBTI(answers);
    const newResultData = {
      userId: user.userId,
      nickname: user.nickname,
      result,
      answers,
      date: new Date().toISOString(),
      visibility: true
    };

    await createTestResult(newResultData);
    setResultData(newResultData);
  };

  if (resultData) {
    let filtered = null;
    filtered = mbtiTypes.find((type) => type.type === resultData.result);
    console.log(filtered);

    return (
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-2xl font-bold m-auto">테스트 결과</h1>
        <div>
          <p>닉네임: {resultData.nickname}</p>
          <p>결과: {resultData.result}</p>
          <p>{filtered.name}</p>
          <p>설명: {filtered.description}</p>
          <p>날짜: {new Date(resultData.date).toLocaleString()}</p>
          <button className="p-3 bg-slate-500 text-white mt-2 rounded-lg" onClick={() => navigate("/results")}>
            모든 테스트 결과
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">MBTI 테스트</h1>
      <TestForm onSubmit={handleTestSubmit} />
    </div>
  );
};

export default Test;
