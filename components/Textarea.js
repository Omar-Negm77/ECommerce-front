import styled from "styled-components";

const StyledInput = styled.textarea`
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  height: 200px;
  required
`;

export default function Input(props) {
  return <StyledInput {...props} />;
}
