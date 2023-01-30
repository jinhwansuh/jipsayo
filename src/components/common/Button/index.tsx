import styled from 'styled-components';
import { StyledButton } from './Button.styled';

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
`;

export default Button;
