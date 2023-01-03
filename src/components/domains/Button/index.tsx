import styled from 'styled-components';

interface Props {
  content: string;
  handleButtonClick: () => void;
}

const Button = ({ content, handleButtonClick }: Props) => {
  return (
    <StyledButtonWrapper>
      <StyledButton onClick={handleButtonClick}>{content}</StyledButton>
    </StyledButtonWrapper>
  );
};

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  flex: 1;
  align-items: flex-end;
  padding-bottom: 80px;
`;

const StyledButton = styled.button`
  width: 80%;
  height: 45px;
  border: 1px solid #aaa;
  border-radius: 20px;
  background-color: #c9c9f8;
`;

export default Button;
