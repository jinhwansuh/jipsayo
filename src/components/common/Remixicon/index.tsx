// https://remixicon.com/
import styled from 'styled-components';

interface Props {
  iconName: string;
  size: string;
  color?: string;
}

const Remixicon = ({ iconName, size, color, ...props }: Props) => {
  return (
    <StyledContainer {...props}>
      <i
        className={`${iconName}`}
        style={{ fontSize: `${size}`, color: color || 'black' }}
      />
    </StyledContainer>
  );
};

const StyledContainer = styled.span``;

export default Remixicon;
