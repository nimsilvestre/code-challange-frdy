import styled from "styled-components";

export const SelectContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

`;

export const Select = styled.select`
  margin-top: 1em;
  margin-bottom: 1em;
  padding: 0.25em;
  border: 0;
  border-bottom: 2px solid currentcolor;
  font-weight: bold;
  letter-spacing: 0.15em;
  border-radius: 0;
  &:focus,
  &:active {
    outline: 0;
    border-bottom-color: black;
  }
`;
export const Option = styled.option`
  display: block;
  padding: 12px;
  width: 250px;
  border: none;
  font-size: 20px;

  outline: none;
`;

//here is the new version
