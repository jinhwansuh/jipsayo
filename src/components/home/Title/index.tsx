import Image from 'next/image';
import styled from 'styled-components';

const Title = () => {
  return (
    <StyledContainer>
      <StyledTitle>집사기 위한 최고의 서비스</StyledTitle>
      <StyledImageWrapper>
        <Image src='/image/logo.png' alt='content image' fill={true} />
      </StyledImageWrapper>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledTitle = styled.div`
  width: 220px;
  font-weight: 700;
  font-size: 34px;
  line-height: 36px;
`;

const StyledImageWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 70px;
`;
export default Title;
