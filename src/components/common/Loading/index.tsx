import styled from 'styled-components';
import Portal from '../Portal';

const Loading = () => {
  return (
    <Portal>
      <StyledContainer>
        <StyledWrapper>
          <StyledText>로딩중입니다...</StyledText>
        </StyledWrapper>
      </StyledContainer>
    </Portal>
  );
};

const StyledContainer = styled.div`
  position: fixed;
  top: 0;
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  z-index: 9000;
`;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const StyledText = styled.div`
  color: #ffffff;
  font-weight: 700;
  font-size: 23px;
`;

export default Loading;
