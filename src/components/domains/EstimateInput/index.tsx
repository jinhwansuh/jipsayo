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
      <div>
        <StyledInput
          name={name}
          type={type}
          onChange={handleInputChange}
          pattern='\\d*'
          inputMode='decimal'
        />
        <span>{tag}</span>
      </div>
    </StyledInputContainer>
  );
};

const StyledInputContainer = styled.div`
  width: 100%;
  font-size: 16px;
  margin: 5px auto;
`;

const StyledLabel = styled.label`
  font-size: 20px;
  margin-bottom: 10px;
  display: block;
`;

const StyledInput = styled.input`
  width: 80%;
  height: 40px;
  font-size: 20px;
  // font-size가 16px 아래면 ios에서 자동으로 zoom-in이 된다!
`;

export default EstimateInput;
