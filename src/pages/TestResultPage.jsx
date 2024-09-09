import React, { useEffect, useState } from "react";
import { getTestResults } from "../api/testResults";

const TestResultPage = () => {
  const [testResults, setTestResults] = useState([]);

  useEffect(() => {
    const fetchTestResults = async () => {
      const results = await getTestResults();
      setTestResults(results);
    };

    fetchTestResults();
    console.log(testResults);
  }, []);

  return (
    <div>
      <p>테스트 결과: {testResults.result}</p>
    </div>
  );
};

export default TestResultPage;
