import styled from "styled-components";

export const StyledButton = styled.button`
  background-color: ${(props) => props.color || "#007bff"}; /* 기본 색상 설정 */
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;
