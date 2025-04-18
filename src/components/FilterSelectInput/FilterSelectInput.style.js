import styled from "styled-components";

export const SelectLabel = styled.label`
  color: #66696b;
  font-size: 12px;
  font-weight: 400;
  min-width: 60px;
`;

export const SelectBox = styled.div`
  border: 1px solid #cfd2d9;
  border-radius: 4px;
  padding: 1.2px 12px;
  width: 100%;
  height: 3.2rem;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SelectOption = styled.select`
  outline: none;
  border: none;
  font-size: 12px;
  font-weight: 500;
  color: #343536;
  background-color: transparent;
  margin-top: 0px;
  width: 100%;
  padding: 3px;
`;
