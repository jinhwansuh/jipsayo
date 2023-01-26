import styled from 'styled-components';

interface Props {
  content: string;
  handleButtonClick?: () => void;
  rest: boolean;
}

const Button = ({ content, handleButtonClick, rest, ...props }: Props) => {
  return (
    <StyledButtonWrapper rest={rest} {...props}>
      <StyledButton onClick={handleButtonClick}>{content}</StyledButton>
    </StyledButtonWrapper>
  );
};

const StyledButtonWrapper = styled.div<Pick<Props, 'rest'>>`
  display: flex;
  justify-content: center;
  flex: ${(props) => (props.rest ? 1 : 0)};
  align-items: flex-end;
  padding-bottom: 40px;
`;

const StyledButton = styled.button`
  width: 296px;
  height: 48px;
  border: 1px solid #222222;
  border-radius: 8px;
  background-color: #c9c9f8;
  padding: 13px 23px;
  font-size: 16px;
  font-weight: 600;
`;

export default Button;
