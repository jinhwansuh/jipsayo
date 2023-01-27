import styled from 'styled-components';

interface Props {
  content: string;
  handleButtonClick?: () => void;
  rest: boolean;
}

const Button = ({ content, handleButtonClick, ...props }: Props) => {
  return (
    <StyledButtonWrapper {...props}>
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
  border: none;
  border-radius: 8px;
  background-color: ${(props) => props.theme.color.button_select};
  padding: 13px 23px;
  font-size: 16px;
  font-weight: 600;
`;

export default Button;
