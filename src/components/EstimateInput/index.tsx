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
  type = 'text',
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
        />
        <span>{tag}</span>
      </div>
    </StyledInputContainer>
  );
};

const StyledInputContainer = styled.div`
  width: 100%;
`;

const StyledLabel = styled.label`
  width: 100%;
`;

const StyledInput = styled.input`
  width: 80%;
`;

export default EstimateInput;
