import { ChangeEvent, FocusEvent } from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  tag?: string;
  type?: string;
  name: string;
  placeholder?: string;
  value: string;
  onFocus: (e: FocusEvent<HTMLInputElement>) => void;
}

const EstimateInput = ({
  title,
  handleInputChange,
  type = 'number',
  tag,
  name,
  value,
  placeholder,
  onFocus,
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
          placeholder={placeholder}
          value={value}
          onFocus={onFocus}
        />
        <StyledTag>{tag}</StyledTag>
      </StyledInputWrapper>
    </StyledInputContainer>
  );
};

const StyledInputContainer = styled.div`
  width: 95%;
  font-size: 16px;
  margin: 10px auto;
`;

const StyledLabel = styled.label`
  display: block;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 5px;
  padding-left: 15px;
`;

const StyledInputWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: ${(props) => props.theme.input.border};
  &:focus-within {
    border-bottom: ${(props) => props.theme.input.borderFocus};
  }
`;

const StyledInput = styled.input`
  // font-size가 16px 아래면 ios에서 자동으로 zoom-in이 된다!
  width: 75%;
  height: 40px;
  font-size: 20px;
  padding-left: 15px;
  border: none;
  background: none;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #aaa;
  }
  &::-webkit-input-placeholder {
    color: #aaa;
  }
  &:-ms-input-placeholder {
    color: #aaa;
  }
`;

const StyledTag = styled.p`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  margin-left: 10px;
`;

export default EstimateInput;
