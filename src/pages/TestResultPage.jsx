import React, { useEffect, useState } from "react";
import { deleteTestResult, getTestResults, updateTestResultVisibility } from "../api/testResults";
import { mbtiTypes } from "../data/mbtiTypes";
import { StyledButton } from "../components/ui/StyledButton";
import { format } from "date-fns";
import useStore from "../data/store";

const TestResultPage = () => {
  const [testResults, setTestResults] = useState([]);
  const { user } = useStore.getState();
  useEffect(() => {
    const fetchTestResults = async () => {
      try {
        const results = await getTestResults();
        // 날짜 최신순 정렬
        const sortedResults = results.sort((a, b) => new Date(b.date) - new Date(a.date));
        setTestResults(sortedResults);
      } catch (error) {
        console.error("테스트 결과를 가져오는 데 실패했습니다:", error);
      }
    };

    fetchTestResults();
  }, []);

  const getTypeDescription = (type) => {
    const foundType = mbtiTypes.find((item) => item.type === type);
    return foundType ? foundType.description : "설명 없음";
  };

  // 날짜 포맷팅 (date-fns 이용)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "yyyy-MM-dd HH:mm:ss");
  };

  const handleDelete = async (id) => {
    if (window.confirm("결과를 삭제하시겠습니까?")) {
      try {
        await deleteTestResult(id);
        // 삭제 후 상태 업데이트
        setTestResults((prev) => prev.filter((result) => result.id !== id));
      } catch (error) {
        console.error("테스트 결과 삭제에 실패했습니다:", error);
      }
    }
  };

  const handleVisibilityChange = async (id) => {
    try {
      await updateTestResultVisibility(id, true); // 공개로 전환
      // 상태 업데이트
      setTestResults((prev) => prev.map((result) => (result.id === id ? { ...result, visibility: true } : result)));
    } catch (error) {
      console.error("테스트 결과 공개 전환에 실패했습니다:", error);
    }
  };
  console.log(user);
  console.log(testResults);
  return (
    <div className="flex flex-col justify-center items-center gap-y-5 mt-5">
      {testResults.map((t) => (
        <div className="w-2/3 p-4 border border-gray-800" key={t.id}>
          <div>
            <p>{t.nickname}</p>
            <p>{formatDate(t.date)}</p> {/* 포맷된 날짜 표시 */}
          </div>

          <p>{t.result}</p>
          <br />
          <p className="mb-5">{getTypeDescription(t.result)}</p>
          {user?.id === t.userId ? (
            <div>
              {t.visibility ? null : (
                <StyledButton
                  onClick={() => handleVisibilityChange(t.id)} // 공개로 전환 클릭 시 handleVisibilityChange 호출
                  className="mr-3"
                  color="crimson"
                >
                  공개로 전환
                </StyledButton>
              )}
              <StyledButton color="gold" onClick={() => handleDelete(t.id)}>
                삭제
              </StyledButton>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default TestResultPage;
