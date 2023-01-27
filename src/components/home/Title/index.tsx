import styled from 'styled-components';
import { NextImage } from '~/components/common';

const Title = () => {
  return (
    <StyledContainer>
      <StyledTitle>집사기 위한 최고의 서비스</StyledTitle>

      <NextImage
        imageSrc={'/image/logo.png'}
        alt='logo'
        width={'120px'}
        height={'70px'}
      />
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

export default Title;
