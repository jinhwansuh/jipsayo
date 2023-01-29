import styled from 'styled-components';
import { NextImage } from '~/components/common';
import { Content } from '~/components/home';
import { PAGE_ROUTE } from '~/constants';

export default function Home() {
  return (
    <>
      <StyledTitleWrapper>
        <StyledTitle>집사기 위한 최고의 서비스</StyledTitle>

        <NextImage
          imageSrc={'/image/logo.PNG'}
          alt='logo'
          width={'120px'}
          height={'70px'}
          priority={true}
        />
      </StyledTitleWrapper>

      <StyledContentWrapper>
        <Content
          title='집값을 계산하세요'
          pageTo={PAGE_ROUTE.RESEARCH_FIRST}
          imageSrc={'/image/result.png'}
          imagePriority={true}
        >
          내 연봉으로 원하는 집을 언제쯤 살 수 있을지 테스트 해보세요!
        </Content>

        <Content
          title='거리를 계산하세요'
          pageTo={PAGE_ROUTE.MAP}
          imageSrc={'/image/map.png'}
        >
          내 직장 주변에 조건에 맞는 어떤 집이 있을까 찾아보세요!
        </Content>
      </StyledContentWrapper>
    </>
  );
}

const StyledTitleWrapper = styled.div`
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

const StyledContentWrapper = styled.div``;
