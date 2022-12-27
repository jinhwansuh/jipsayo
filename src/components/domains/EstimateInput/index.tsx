import { ChangeEvent } from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  tag?: string;
  type?: string;
  name: string;
}

const EstimateInput = ({
  title,
  handleInputChange,
  type = 'number',
  tag,
  name,
}: Props) => {
  return (
    <StyledInputContainer>
      <StyledLabel>{title}</StyledLabel>
      <StyledInputWrapper>
        <StyledInput
          name={name}
          type={type}
          onChange={handleInputChange}
          pattern='\\d*'
          inputMode='decimal'
        />
        <StyledTag>{tag}</StyledTag>
      </StyledInputWrapper>
    </StyledInputContainer>
  );
};

const StyledInputContainer = styled.div`
  width: 100%;
  font-size: 16px;
  margin: 5px auto;
`;

const StyledLabel = styled.label`
  font-size: 18px;
  margin-bottom: 10px;
  display: block;
  padding-left: 10px;
`;

const StyledInputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  // font-size가 16px 아래면 ios에서 자동으로 zoom-in이 된다!
  width: 80%;
  height: 40px;
  font-size: 20px;
  padding-left: 20px;
  border: 0.5px solid grey;
  border-radius: 20px;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #e18f9a;
  }
`;

const StyledTag = styled.p`
  flex: 1;
  padding-left: 10px;
  font-size: 16px;
`;

export default EstimateInput;
