import styled from 'styled-components';

interface Props {
  title: string;
  handleInputChange: () => void;
  tag?: string;
  type?: string;
}

const EstimateInput = ({
  title,
  handleInputChange,
  type = 'text',
  tag,
}: Props) => {
  return (
    <StyledInputContainer>
      <StyledLabel>{title}</StyledLabel>
      <div>
        <StyledInput type={type} onChange={handleInputChange} />
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
