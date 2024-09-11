import React, { useState } from "react";
import { questions } from "../data/questions";
import styled from "styled-components";

const TestForm = ({ onSubmit }) => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleChange = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(answers);
  };

  return (
    <form onSubmit={handleSubmit} className=" space-y-4 p-4 bg-gray-100 w-auto rounded shadow-md">
      {questions.map((q, index) => (
        <div key={q.id} className="mb-4">
          <p className="font-semibold">{q.question}</p>
          {q.options.map((option, i) => (
            <Label key={i}>
              <Radio
                name={`question-${index}`}
                value={option}
                checked={answers[index] === option}
                onChange={() => handleChange(index, option)}
              />
              {option}
            </Label>
          ))}
        </div>
      ))}
      <button type="submit" className="text-center w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        제출하기
      </button>
    </form>
  );
};

export default TestForm;

const Radio = styled.input.attrs({ type: "radio" })`
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  border: 2px solid #d1d5db; /* 기본 테두리 색상 */
  position: relative;
  cursor: pointer;
  outline: none;
  background-color: #ffffff; /* 기본 배경색 */

  &:checked {
    width: 1.25rem;
    height: 1.25rem;
    background-color: #2563eb; /* 선택된 상태 배경색 */
    border-color: #2563eb; /* 선택된 상태 테두리 색상 */
  }

  &:checked::after {
    content: "";
    display: block;
    width: 1rem; /* 선택된 상태의 내부 동그라미 크기 */
    height: 1rem;
    border-radius: 50%;
    background-color: #ffffff; /* 선택된 상태 내부 동그라미 색상 */
    position: absolute;
    top: 0rem;
    left: 0rem;
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 0.5rem;
`;
