import React, { useContext, useState } from "react";
import TestForm from "../components/TestForm";
import { calculateMBTI } from "../utils/mbtiCalculator";
import { createTestResult } from "../api/testResults";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { mbtiTypes } from "../data/mbtiTypes";

const Test = () => {
  const [testResults, setTestResults] = useState([]);
  const { user } = useContext(UserContext);
  console.log(user);
  const navigate = useNavigate();

  const [resultData, setResultData] = useState(null);
  console.log(user);
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
    console.log(resultData);
    await createTestResult(newResultData, user);
    setResultData(newResultData);
  };

  console.log(resultData);

  if (resultData) {
    let filtered = null;
    filtered = mbtiTypes.find((type) => type.type === resultData.result);
    console.log(filtered);
    return (
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">테스트 결과</h1>
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
