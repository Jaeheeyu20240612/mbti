import React, { useContext, useEffect, useState } from "react";
import { deleteTestResult, getTestResults, updateTestResultVisibility } from "../api/testResults";
import { mbtiTypes } from "../data/mbtiTypes";
import { StyledButton } from "../components/ui/StyledButton";
import { format } from "date-fns";
import useStore from "../data/store";
import { UserContext } from "../context/UserContext";

const TestResultPage = () => {
  const [testResults, setTestResults] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchTestResults = async () => {
      const results = await getTestResults();
      console.log(results);
      const sortedResults = results.sort((a, b) => new Date(b.date) - new Date(a.date));
      setTestResults(sortedResults);
    };
    fetchTestResults();
  }, []);

  const getTypeDescription = (type) => {
    const foundType = mbtiTypes.find((item) => item.type === type);
    if (foundType) {
      return foundType.description;
    } else {
      return null;
    }
  };

  // 날짜 포맷팅 (date-fns 이용)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "yyyy-MM-dd HH:mm:ss");
  };

  const handleDelete = async (id) => {
    if (window.confirm("결과를 삭제하시겠습니까?")) {
      await deleteTestResult(id);
      await getTestResults();
      setTestResults((prev) => prev.filter((result) => result.id !== id));
    }
  };

  console.log(testResults);

  const handleVisibilityChange = async (id) => {
    try {
      await updateTestResultVisibility(id, true); // 공개로 전환
      // 상태 업데이트
      setTestResults((prev) => prev.map((result) => (result.id === id ? { ...result, visibility: true } : result)));
    } catch (error) {
      console.error("테스트 결과 공개 전환에 실패했습니다:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-y-5 mt-5">
      {testResults.map((t) =>
        t.visibility === true ? (
          <div className="w-2/3 p-4 border border-gray-800" key={t.id}>
            <div>
              <p>닉네임: {t.nickname}</p>
              <p>{formatDate(t.date)}</p>
            </div>

            <p>{t.result}</p>
            <br />
            <p className="mb-5">{getTypeDescription(t.result)}</p>
            <div>
              {user?.userId === t.userId && (
                <div>
                  <StyledButton onClick={() => handleVisibilityChange(t.id)} className="mr-3" color="crimson">
                    공개로 전환
                  </StyledButton>
                  <StyledButton color="gold" onClick={() => handleDelete(t.id)}>
                    삭제
                  </StyledButton>
                </div>
              )}
            </div>
          </div>
        ) : null
      )}
    </div>
  );
};
export default TestResultPage;
