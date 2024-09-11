import React, { useContext } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { useStore } from "zustand";
import { UserContext } from "../context/UserContext";
import { useQueryClient } from "@tanstack/react-query";

const Home = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData("users");
  const token = localStorage.getItem("users");
  // const { data: user } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: () => getUserProfile(token)
  // });
  const handleButtonClick = () => {
    if (token) {
      alert("로그인페이지로 이동합니다.");
      navigate("/login");
      return;
    } else {
      navigate("/test");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center gap-14">
      <h1 className="text-center font-bold text-4xl">무료 성격 테스트</h1>
      <p className="text-center">자신의 성격 유형을 확일할 수 있도록 솔직하게 답변해 주세요.</p>
      <div className="flex flex-row gap-4 text-center justify-center items-center p-10">
        <section className="shadow-md">
          <p>성격 유형 검사</p>
          <p>자신의 성격 유형을 파악하고 삶의 여러 영역에서 어떤 영향을 미치는지 알아보세요.</p>
        </section>
        <section className="shadow-md">
          <p>성격 유형 이해</p>
          <p>다른 사람들이 어떻게 행동하는지 이해하는데 도움을 줄 수 있습니다.</p>
        </section>
        <section className="shadow-md flex flex-col">
          <p>팀 평가</p>
          <p>팀 내에서 자신과 동료들의 성격을 이해하고 협의할 수 있는 방법을 배워보세요.</p>
        </section>
      </div>
      <button className="text-center p-4 border border-sky-500 w-1/5 rounded-2xl" onClick={handleButtonClick}>
        {" "}
        내 성격 알아보러 가기
      </button>
    </div>
  );
};

export default Home;
